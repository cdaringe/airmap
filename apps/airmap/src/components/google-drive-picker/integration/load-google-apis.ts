import { useEffect, useState } from "react";
import useInjectScript from "./use-inject-google-script";

export const load = () =>
  Promise.all([
    new Promise((res) => window.gapi.load("auth", res)),
    new Promise((res) => window.gapi.load("picker", { callback: res })),
  ]);

export const useGoogleApis = () => {
  const [isRootApiLoaded, rootApiLoadError] = useInjectScript();
  const [isPickerApiLoaded, setPickerApiLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  useEffect(() => {
    if (isPickerApiLoaded) return;
    if (rootApiLoadError || !isRootApiLoaded) return;
    load().then(() => setPickerApiLoaded(true), setLoadError);
  }, [isRootApiLoaded, rootApiLoadError, isPickerApiLoaded]);
  return { isPickerApiLoaded, error: rootApiLoadError || loadError };
};
