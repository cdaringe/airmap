import { useRouter } from "next/router";
import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { combine } from "../../../../../packages/cleanair-sensor-aeroqual-s500/mod";
import type { Entry as DatEntry } from "../../../../../packages/cleanair-sensor-aeroqual-s500/src/interfaces";
import { Entry as StravaEntry } from "../../../../../packages/cleanair-sensor-strava-gpx/mod";
import Button from "../atoms/button";

const SUPPORTED_FILE_TYPES = ["csv", "gpx"] as const;
type SupportedFileType = (typeof SUPPORTED_FILE_TYPES)[number];

const fileTypes = new Set(SUPPORTED_FILE_TYPES);

const withHandlerErr = <F extends (...args: any[]) => any>(
  fn: F,
  onError: (x: unknown) => void
) => Promise.resolve(fn()).catch(onError);

export const AeroqualS500DataSource: React.FC<{
  onInputRead: (_: any) => void;
}> = ({ onInputRead }) => {
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [aeroqualS500Data, setAeroqualS500Data] = React.useState<
    undefined | DatEntry[]
  >(undefined);
  const [stravaData, setStravaData] = React.useState<undefined | StravaEntry[]>(
    undefined
  );
  React.useEffect(
    function submitOnReady() {
      if (!err && aeroqualS500Data && stravaData) {
        setIsReady(true);
      }
    },
    [err, aeroqualS500Data, stravaData, onInputRead]
  );
  const handleFilesChanged = React.useCallback((filelist: FileList) => {
    withHandlerErr(
      async () => {
        setIsLoading(true);
        await Promise.all(
          Array.from(filelist).map(async (file) => {
            const ext = file.name.match(/\.(.*)$/)?.[1] as SupportedFileType;
            if (!fileTypes.has(ext)) {
              throw new Error(
                `invalid filename. must end with ${[...fileTypes].join(", ")}`
              );
            }
            switch (ext) {
              case "csv": {
                const records = await import(
                  "../pages/map/hooks/use-sensor-mapping-resources"
                ).then(async (mod) => {
                  return (await mod.getAeroqualS5000()).stream.parse(
                    file.stream().getReader()
                  );
                });
                setAeroqualS500Data(records);
                break;
              }
              case "gpx": {
                const records = await import(
                  "../../../../../packages/cleanair-sensor-strava-gpx/mod"
                ).then(async (mod) => {
                  return mod.ofGpxString(await file.text());
                });
                setStravaData(records);
                break;
              }
              default:
                throw new Error(`unhandled case: ${ext}`);
            }
          })
        ).finally(() => {
          setIsLoading(false);
        });
      },
      (err) => setErr(String(err))
    );
  }, []);
  return (
    <>
      {err ? (
        <>
          <h3>Error</h3>
          <p>{err}</p>
          <Button onClick={() => setErr("")}>Try again?</Button>
        </>
      ) : (
        <>
          {isLoading ? <p>Loading...</p> : null}

          <FileUploader
            disabled={isLoading}
            multiple
            handleChange={handleFilesChanged}
            name="file"
            types={[...fileTypes]}
          />
          {aeroqualS500Data ? (
            <p className="text-green-800">✅ AeroqualS500</p>
          ) : (
            <p className="text-red-800">Missing AeroqualS500 file</p>
          )}
          {stravaData ? (
            <p className="text-green-800">✅ Strava</p>
          ) : (
            <p className="text-red-800">Missing strava file</p>
          )}
        </>
      )}
      <Button
        disabled={!isReady}
        className="block m-auto mt-2"
        onClick={async () => {
          if (!stravaData || !aeroqualS500Data) {
            throw new Error("expected Strava & MiniWras data");
          }
          const records = combine({
            strava: stravaData,
            aeroqualS500: aeroqualS500Data,
          });
          onInputRead(records);
          router.push("/map");
        }}
      >
        Submit
      </Button>
    </>
  );
};
