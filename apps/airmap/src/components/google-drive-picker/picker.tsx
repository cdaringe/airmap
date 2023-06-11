import { useCallback, useEffect, useState } from "react";
import type { PickerConfiguration } from "./integration/interfaces";
import { useGoogleApis } from "./integration/load-google-apis";
import { createPickerResources } from "./integration/picker";

const defaultScopes = ["https://www.googleapis.com/auth/drive.readonly"];

type PickerBuildResources = {
  builder: google.picker.PickerBuilder;
  view: google.picker.DocsView;
};

export default function useDrivePicker({
  onSelect,
  onPreBuild,
  ...userConfig
}: PickerConfiguration & {
  /**
   * https://developers.google.com/picker/docs/reference#docs-view-mode
   */
  onPreBuild?: (resources: PickerBuildResources) => void;
  onSelect: (item: google.picker.ResponseObject) => void;
}) {
  const { isPickerApiLoaded, error: pickerLoadError } = useGoogleApis();
  const [config, setConfig] = useState(userConfig);
  const [isOpeningPickerAfterAuth, setIsOpeningPickerAfterAuth] =
    useState(false);
  const [isAuthWindowVisible, setIsAuthWindowVisible] = useState(false);

  const launchPicker = useCallback(() => {
    if (!isPickerApiLoaded) throw new Error("picker is not yet loaded");
    const resources = createPickerResources(config);
    if (onPreBuild) onPreBuild(resources);
    resources.builder
      .setCallback((data) => {
        if (data.action === google.picker.Action.PICKED) onSelect(data);
      })
      .build()
      .setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, onSelect, isPickerApiLoaded]);

  // use effect to open picker after authentcation
  useEffect(() => {
    if (!isOpeningPickerAfterAuth) return;
    launchPicker();
    setIsOpeningPickerAfterAuth(false);
  }, [isOpeningPickerAfterAuth, launchPicker]);

  const open = () => {
    if (!config.token) return setIsAuthWindowVisible(true);
    launchPicker();
  };

  // Open auth window after given config state is ready
  useEffect(() => {
    if (!isAuthWindowVisible) return;
    window.gapi.auth.authorize(
      {
        client_id: config.clientId,
        scope: config.customScopes
          ? [...defaultScopes, ...config.customScopes]
          : defaultScopes,
        immediate: false,
      },
      (authResult) => {
        setIsAuthWindowVisible(false);
        if (authResult && !authResult.error) {
          setConfig((prev) => ({ ...prev, token: authResult.access_token }));
          setIsOpeningPickerAfterAuth(true);
        }
      }
    );
  }, [isAuthWindowVisible, config.clientId, config.customScopes]);

  return { open, isLoaded: isPickerApiLoaded, error: pickerLoadError };
}
