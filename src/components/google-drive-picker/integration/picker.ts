import { PickerConfiguration } from "./interfaces";

export const createPickerResources = ({
  token,
  developerKey,
  viewId,
  disableDefaultView = false,
}: PickerConfiguration) => {
  if (!token) throw new Error("missing token");
  const view = new google.picker.DocsView(viewId || google.picker.ViewId.DOCS);
  const builder = new google.picker.PickerBuilder()
    .setOAuthToken(token)
    .setDeveloperKey(developerKey);
  if (!disableDefaultView) builder.addView(view);
  return { builder, view };
};
