import { AlertTriangle, FileSearch } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { Entry as StravaEntry } from "../../../../../packages/cleanair-sensor-strava-gpx/mod";
import { combine } from "../../../../../packages/cleanair-sensor-tiger-xt/mod";
import type { TigerXtOnlyEntry } from "../../../../../packages/cleanair-sensor-tiger-xt/src/interfaces";
import Button from "../atoms/button";
import { getTigerXt } from "../pages/map/hooks/use-sensor-mapping-resources";

const DataExplorerFlyout = dynamic(
  () =>
    import("../DataExplorerFlyout").then((m) => ({
      default: m.DataExplorerFlyout,
    })),
  { ssr: false }
);

const fileTypes = new Set(["csv", "gpx"] as const);

// Helper functions for data explorer configurations
const getTigerXtColumns = () => [
  {
    key: "date",
    label: "Date",
    type: "date" as const,
    formatValue: (value: any, dateOffsetMinutes?: number) => {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        if (dateOffsetMinutes) {
          date.setMinutes(date.getMinutes() + dateOffsetMinutes);
        }
        return date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }
      return String(value);
    },
  },
  { key: "isobutylene", label: "Isobutylene", type: "metric" as const },
];

const getStravaColumns = () => [
  {
    key: "date",
    label: "Date",
    type: "date" as const,
    formatValue: (value: any, dateOffsetMinutes?: number) => {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        if (dateOffsetMinutes) {
          date.setMinutes(date.getMinutes() + dateOffsetMinutes);
        }
        return date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }
      return String(value);
    },
  },
  { key: "lat", label: "Latitude", type: "data" as const },
  { key: "lon", label: "Longitude", type: "data" as const },
];

const getTigerXtStats = (
  data: TigerXtOnlyEntry[],
  dateOffsetMinutes: number
) => {
  if (!data || data.length === 0) return { count: 0 };

  const timestamps = data
    .map((item) => {
      const date = new Date(item.date);
      if (dateOffsetMinutes !== 0)
        date.setMinutes(date.getMinutes() + dateOffsetMinutes);
      return date;
    })
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  const isobutyleneValues = data
    .map((item) => item.isobutylene)
    .filter((v) => typeof v === "number");

  return {
    count: data.length,
    minDate: timestamps[0] || undefined,
    maxDate: timestamps[timestamps.length - 1] || undefined,
    duration:
      timestamps[0] && timestamps[timestamps.length - 1]
        ? timestamps[timestamps.length - 1].getTime() - timestamps[0].getTime()
        : undefined,
    metrics:
      isobutyleneValues.length > 0
        ? [
            {
              key: "isobutylene",
              label: "Isobutylene",
              min: Math.min(...isobutyleneValues),
              max: Math.max(...isobutyleneValues),
              avg:
                isobutyleneValues.reduce((a, b) => a + b, 0) /
                isobutyleneValues.length,
              unit: "µg/m³",
            },
          ]
        : undefined,
  };
};

const getStravaStats = (data: StravaEntry[], dateOffsetMinutes: number) => {
  if (!data || data.length === 0) return { count: 0 };

  const timestamps = data
    .map((item) => {
      const date = new Date(item.date);
      if (dateOffsetMinutes !== 0)
        date.setMinutes(date.getMinutes() + dateOffsetMinutes);
      return date;
    })
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  return {
    count: data.length,
    minDate: timestamps[0] || undefined,
    maxDate: timestamps[timestamps.length - 1] || undefined,
    duration:
      timestamps[0] && timestamps[timestamps.length - 1]
        ? timestamps[timestamps.length - 1].getTime() - timestamps[0].getTime()
        : undefined,
  };
};

const withHandlerErr = <F extends (...args: any[]) => any>(
  fn: F,
  onError: (x: unknown) => void
) => Promise.resolve(fn()).catch(onError);

const applyOffsetToTigerXtData = (
  data: TigerXtOnlyEntry[],
  offsetMinutes: number
): TigerXtOnlyEntry[] => {
  return data.map((item) => ({
    ...item,
    date: new Date(new Date(item.date).getTime() + offsetMinutes * 60 * 1000),
  }));
};

const applyOffsetToStravaData = (
  data: StravaEntry[],
  offsetMinutes: number
): StravaEntry[] => {
  return data.map((item) => ({
    ...item,
    date: new Date(new Date(item.date).getTime() + offsetMinutes * 60 * 1000),
  }));
};

type CombinationState =
  | { status: "waiting" } // No data yet
  | { status: "ready"; combinedFeatures: any[] } // Successfully combined
  | { status: "error"; error: string } // Error during combination
  | { status: "empty"; error: string }; // No results after combination

export const TigerXtDataSource: React.FC<{
  onInputRead: (_: any) => void;
}> = ({ onInputRead }) => {
  const router = useRouter();
  const [err, setErr] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [tigerXtData, setTigerXtData] = React.useState<
    undefined | TigerXtOnlyEntry[]
  >(undefined);
  const [stravaData, setStravaData] = React.useState<undefined | StravaEntry[]>(
    undefined
  );
  console.log({ stravaData });
  const [explorerData, setExplorerData] = React.useState<{
    isOpen: boolean;
    data: any[] | null;
    title: string;
    columns: any[];
    getStats: (data: any[], dateOffsetMinutes: number) => any;
    onApplyOffset?: (offsetMinutes: number) => void;
  }>({
    isOpen: false,
    data: null,
    title: "",
    columns: [],
    getStats: () => ({ count: 0 }),
  });

  const [combinationState, setCombinationState] =
    React.useState<CombinationState>({ status: "waiting" });

  // Derived values from single state
  const isReady = combinationState.status === "ready";
  const combinedData =
    combinationState.status === "ready"
      ? combinationState.combinedFeatures
      : null;
  const combinedError =
    combinationState.status === "error"
      ? combinationState.error
      : combinationState.status === "empty"
      ? combinationState.error
      : "";

  React.useEffect(
    function handleCombination() {
      // Reset to waiting if we don't have the required data
      if (err || !tigerXtData || !stravaData) {
        setCombinationState({ status: "waiting" });
        return;
      }

      // Reactive combining - runs whenever tigerXt or strava data changes
      try {
        const combined = combine({
          tigerXt: tigerXtData,
          strava: stravaData,
        }) as any; // It's a FeatureCollection but types aren't properly exported

        const features = combined.features || [];
        if (features.length === 0) {
          setCombinationState({
            status: "empty",
            error:
              "No data points found after combining Tiger XT and GPS data. Check timestamps alignment.",
          });
        } else {
          setCombinationState({
            status: "ready",
            combinedFeatures: features,
          });
        }
      } catch (error) {
        setCombinationState({
          status: "error",
          error: `Error combining data: ${String(error)}`,
        });
      }
    },
    [err, tigerXtData, stravaData]
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
        <div className="flex flex-col gap-2">
          {isLoading ? <p>Loading...</p> : null}

          <FileUploader
            disabled={isLoading}
            multiple
            handleChange={handleFilesChanged}
            name="file"
            types={[...fileTypes]}
          />
          {tigerXtData ? (
            <div className="flex items-center justify-between">
              <p className="text-green-800">✅ Tiger XT CSV</p>
              <Button
                className="text-sm px-2 py-1"
                onClick={() => {
                  setExplorerData({
                    isOpen: true,
                    data: tigerXtData,
                    title: "Tiger XT Data",
                    columns: getTigerXtColumns(),
                    getStats: getTigerXtStats,
                    onApplyOffset: (offsetMinutes: number) => {
                      if (tigerXtData) {
                        setTigerXtData(
                          applyOffsetToTigerXtData(tigerXtData, offsetMinutes)
                        );
                      }
                    },
                  });
                }}
              >
                <FileSearch className="w-4 h-4 inline mr-1" />
                Inspect
              </Button>
            </div>
          ) : (
            <p className="text-red-800">Missing Tiger XT CSV file</p>
          )}
          {stravaData ? (
            <div className="flex items-center justify-between">
              <p className="text-green-800">✅ GPS Track</p>
              <Button
                className="text-sm px-2 py-1"
                onClick={() => {
                  setExplorerData({
                    isOpen: true,
                    data: stravaData,
                    title: "Strava GPS Data",
                    columns: getStravaColumns(),
                    getStats: getStravaStats,
                    onApplyOffset: (offsetMinutes: number) => {
                      if (stravaData) {
                        setStravaData(
                          applyOffsetToStravaData(stravaData, offsetMinutes)
                        );
                      }
                    },
                  });
                }}
              >
                <FileSearch className="w-4 h-4 inline mr-1" />
                Inspect
              </Button>
            </div>
          ) : (
            <p className="text-red-800">Missing GPS GPX file</p>
          )}
        </div>
      )}

      {combinedError && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-amber-800 font-medium">Warning</p>
              <p className="text-amber-700 text-sm mt-1">{combinedError}</p>
              <p className="text-amber-600 text-sm mt-2">
                Try inspecting your data above to check timestamp alignment and
                data quality.
              </p>
            </div>
          </div>
        </div>
      )}

      <Button
        disabled={!isReady}
        className="block m-auto mt-2"
        onClick={async () => {
          if (!stravaData || !tigerXtData) {
            throw new Error("expected GPS & Tiger XT data");
          }
          if (combinedData && combinedData.length > 0) {
            onInputRead({ type: "FeatureCollection", features: combinedData });
          } else {
            // Fallback to combining if no pre-combined data
            const tigerXtRecords = combine({
              tigerXt: tigerXtData,
              strava: stravaData,
            });
            onInputRead(tigerXtRecords);
          }
          router.push("/map");
        }}
      >
        Submit
      </Button>

      <DataExplorerFlyout
        isOpen={explorerData.isOpen}
        onClose={() => setExplorerData((prev) => ({ ...prev, isOpen: false }))}
        data={explorerData.data}
        title={explorerData.title}
        columns={explorerData.columns}
        getStats={explorerData.getStats}
        onApplyOffset={explorerData.onApplyOffset}
      />
    </>
  );
};
