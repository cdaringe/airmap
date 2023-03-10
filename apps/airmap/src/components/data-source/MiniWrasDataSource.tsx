import { useRouter } from "next/router";
import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { Entry as StravaEntry } from "../../../../../packages/cleanair-sensor-strava-gpx/mod";
import type { DatEntry } from "../../../../../packages/cleanair-sensor-miniwras/src/interfaces";
import type { Entry as PocketEntry } from "../../../../../packages/cleanair-sensor-pocketlabs/src/interfaces";
import Button from "../atoms/button";
import {
  getMiniWras,
  getPocket,
} from "../pages/map/hooks/use-sensor-mapping-resources";
import { combine } from "../../../../../packages/cleanair-sensor-miniwras/mod";

const fileTypes = new Set(["dat", "csv", "gpx"] as const);

const withHandlerErr = <F extends (...args: any[]) => any>(
  fn: F,
  onError: (x: unknown) => void
) => Promise.resolve(fn()).catch(onError);

export const MiniWrasDataSource: React.FC<{
  onInputRead: (_: any) => void;
}> = ({ onInputRead }) => {
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [pocketData, setPocketData] = React.useState<undefined | PocketEntry[]>(
    undefined
  );
  const [miniWrasData, setMiniWrasData] = React.useState<
    undefined | DatEntry[]
  >(undefined);
  const [stravaData, setStravaData] = React.useState<undefined | StravaEntry[]>(
    undefined
  );
  React.useEffect(
    function submitOnReady() {
      if (!err && miniWrasData && stravaData) {
        setIsReady(true);
      }
    },
    [err, pocketData, miniWrasData, stravaData, onInputRead]
  );
  const handleFilesChanged = React.useCallback((filelist: FileList) => {
    withHandlerErr(
      async () => {
        setIsLoading(true);
        await Promise.all(
          Array.from(filelist).map(async (file) => {
            const ext = file.name.match(/\.(.*)$/)?.[1] as
              | "dat"
              | "csv"
              | "gpx";
            if (!fileTypes.has(ext)) {
              throw new Error(
                `invalid filename. must end with ${[...fileTypes].join(", ")}`
              );
            }
            switch (ext) {
              case "csv": {
                const mod = await getPocket();
                const { records } = await mod.stream.parse(
                  file.stream().getReader()
                );
                setPocketData(records);
                break;
              }
              case "dat": {
                const mod = await getMiniWras();
                const parsed = await mod.stream.parse(
                  file.stream().getReader()
                );
                setMiniWrasData(parsed.records);
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
          {pocketData ? (
            <p className="text-green-800">✅ PocketLabs</p>
          ) : (
            <p className="text-red-800">Missing pocketlab file</p>
          )}
          {miniWrasData ? (
            <p className="text-green-800">✅ MiniWras</p>
          ) : (
            <p className="text-red-800">Missing miniwras file</p>
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
          const mod = await getMiniWras();
          if (!stravaData || !miniWrasData) {
            throw new Error("expected Strava & MiniWras data");
          }
          const miniwrasRecords = combine({
            pocketlabs: pocketData,
            strava: stravaData,
            miniwras: miniWrasData,
          });
          onInputRead(miniwrasRecords);
          router.push("/map");
        }}
      >
        Submit
      </Button>
    </>
  );
};
