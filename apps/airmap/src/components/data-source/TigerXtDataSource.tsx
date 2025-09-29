import { useRouter } from "next/router";
import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { Entry as StravaEntry } from "../../../../../packages/cleanair-sensor-strava-gpx/mod";
import { combine } from "../../../../../packages/cleanair-sensor-tiger-xt/mod";
import type { TigerXtOnlyEntry } from "../../../../../packages/cleanair-sensor-tiger-xt/src/interfaces";
import Button from "../atoms/button";
import { getTigerXt } from "../pages/map/hooks/use-sensor-mapping-resources";

const fileTypes = new Set(["csv", "gpx"] as const);

const withHandlerErr = <F extends (...args: any[]) => any>(
  fn: F,
  onError: (x: unknown) => void
) => Promise.resolve(fn()).catch(onError);

export const TigerXtDataSource: React.FC<{
  onInputRead: (_: any) => void;
}> = ({ onInputRead }) => {
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [tigerXtData, setTigerXtData] = React.useState<
    undefined | TigerXtOnlyEntry[]
  >(undefined);
  const [stravaData, setStravaData] = React.useState<undefined | StravaEntry[]>(
    undefined
  );

  React.useEffect(
    function submitOnReady() {
      if (!err && tigerXtData && stravaData) {
        setIsReady(true);
      }
    },
    [err, tigerXtData, stravaData, onInputRead]
  );

  const handleFilesChanged = React.useCallback((filelist: FileList) => {
    withHandlerErr(
      async () => {
        setIsLoading(true);
        await Promise.all(
          Array.from(filelist).map(async (file) => {
            const ext = file.name.match(/\.(.*)$/)?.[1] as "csv" | "gpx";
            if (!fileTypes.has(ext)) {
              throw new Error(
                `invalid filename. must end with ${[...fileTypes].join(", ")}`
              );
            }
            switch (ext) {
              case "csv": {
                const mod = await getTigerXt();
                const parsed = await mod.stream.parse(
                  file.stream().getReader()
                );
                setTigerXtData(parsed);
                break;
              }
              case "gpx": {
                const mod = await import(
                  "../../../../../packages/cleanair-sensor-strava-gpx/mod"
                );
                const data = await file.text();
                const records = mod.ofGpxString(data);
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
          {tigerXtData ? (
            <p className="text-green-800">✅ Tiger XT CSV</p>
          ) : (
            <p className="text-red-800">Missing Tiger XT CSV file</p>
          )}
          {stravaData ? (
            <p className="text-green-800">✅ GPS Track</p>
          ) : (
            <p className="text-red-800">Missing GPS GPX file</p>
          )}
        </>
      )}
      <Button
        disabled={!isReady}
        className="block m-auto mt-2"
        onClick={async () => {
          if (!stravaData || !tigerXtData) {
            throw new Error("expected GPS & Tiger XT data");
          }
          const tigerXtRecords = combine({
            tigerXt: tigerXtData,
            strava: stravaData,
          });
          onInputRead(tigerXtRecords);
          router.push("/map");
        }}
      >
        Submit
      </Button>
    </>
  );
};
