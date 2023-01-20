import React from "react";
import Button from "../src/components/atoms/button";
import Input from "../src/components/atoms/input";

const DEFAULT_MIN_STOP_CLICKS = 3;

function timeoutLoop(opts: {
  fn: () => Promise<void>;
  timeoutRef: { current: number | null };
  isRecordingPausedRef?: { current: boolean };
  duration?: number;
  leadingEdge?: boolean;
}) {
  const {
    fn,
    timeoutRef,
    duration = 30_000,
    leadingEdge = true,
    isRecordingPausedRef,
  } = opts;

  timeoutRef.current = window.setTimeout(
    () => {
      const workP = isRecordingPausedRef?.current ? Promise.resolve() : fn();
      return workP.finally(() => {
        if (!Number.isFinite(timeoutRef.current)) return;
        timeoutLoop({ ...opts, leadingEdge: false });
      });
    },
    leadingEdge ? 0 : duration
  ) as unknown as number;
}

export default function GpsTracker() {
  const preElRef = React.useRef<HTMLPreElement>(null);
  const timeoutRef = React.useRef<number | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [durationMs, setDurationMs] = React.useState(10000);
  const isRecordingPausedRef = React.useRef<boolean>(isPaused);
  const togglePause = React.useCallback(() => {
    isRecordingPausedRef.current = !isRecordingPausedRef.current;
    setIsPaused(isRecordingPausedRef.current);
  }, [setIsPaused]);
  const [runId, setRunId] = React.useState(new Date().getTime());
  const [err, setErr] = React.useState("");
  const getPosAndAppend = React.useCallback(async () => {
    setRunId((p) => p + 1);
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        })
      );
      const preEl = preElRef.current;
      if (!preEl) throw new Error("missing pre el");
      preEl.innerHTML +=
        [
          new Date(pos.timestamp).toISOString(),
          pos.coords.latitude,
          pos.coords.longitude,
        ]
          .map((v) => v.toString())
          .join(",") + "\n";
    } catch (err) {
      setErr(String(err));
    }
  }, []);
  const onRecord = React.useCallback(() => {
    const preEl = preElRef.current;
    if (!preEl) return;
    preEl.innerHTML = "timestamp,latitude,longitude\n";
    timeoutLoop({
      fn: getPosAndAppend,
      timeoutRef,
      duration: durationMs,
      isRecordingPausedRef,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeoutRef, getPosAndAppend, durationMs]);
  const [countStopClickRemaining, setStopClockRemaining] = React.useState(
    DEFAULT_MIN_STOP_CLICKS
  );
  const onStop = React.useCallback(() => {
    const reset = () => setStopClockRemaining(DEFAULT_MIN_STOP_CLICKS);
    if (countStopClickRemaining) {
      setStopClockRemaining((x) => x - 1);
      const resetT = setTimeout(reset, 1_000);
      return () => clearTimeout(resetT);
    } else {
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = null;
      setRunId(0);
      reset();
    }
  }, [countStopClickRemaining]);
  const isRunning = Number.isFinite(timeoutRef.current);
  return (
    <div className="p-2">
      <Button
        disabled={isRecordingPausedRef.current}
        styles={{
          bg: isRunning
            ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200"
            : "bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200",
          display: "inline-block",
        }}
        className="mr-1"
        onClick={() => {
          isRunning ? onStop() : onRecord();
        }}
      >
        {isRunning ? `Stop (${countStopClickRemaining})` : "Start"}
      </Button>
      <Button
        disabled={!isRunning}
        styles={{
          bg: "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200",
          display: "inline-block",
        }}
        className="mr-1"
        onClick={() => togglePause()}
      >
        {isRecordingPausedRef.current ? "Resume" : "Pause"}
      </Button>
      <Button
        styles={{
          bg: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200",
          display: "inline-block",
        }}
        className="mr-1"
        onClick={() => {
          var data = preElRef.current?.textContent || "";
          var c = document.createElement("a");
          c.download = `gps_data_${new Date().toISOString()}.csv`;
          var t = new Blob([data], {
            type: "text/csv",
          });
          c.href = window.URL.createObjectURL(t);
          c.click();
        }}
      >
        {"Export"}
      </Button>
      <label htmlFor="durationMs">Interval (ms)</label>
      <Input
        type="number"
        name="durationMs"
        value={durationMs}
        disabled={isRunning}
        onChange={(evt) => {
          const ms = parseInt(evt.currentTarget.value, 10);
          if (Number.isInteger(ms)) {
            setDurationMs(ms);
          }
        }}
      />
      {err ? err : null}
      <pre className="block" ref={preElRef}></pre>
    </div>
  );
}
