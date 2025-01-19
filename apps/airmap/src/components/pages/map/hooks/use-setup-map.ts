import { Map } from "mapbox-gl";
import React from "react";

export const useSetupMap = ({
  mapRef,
  className,
}: {
  className: string;
  mapRef: React.MutableRefObject<Map>;
}) => {
  const [i, setI] = React.useState(0);
  const interval = React.useMemo(() => {
    return setInterval(() => {
      setI((i) => i + 1);
    }, 50);
  }, []);
  const map = mapRef.current;

  React.useEffect(() => {
    if (!map) {
      return;
    }
    clearInterval(interval!);
    const container = map.getContainer();
    const isSetup = container.className.includes(className);
    if (isSetup) return;
    container.className += " " + className;
  }, [interval, map, className, i]);
};
