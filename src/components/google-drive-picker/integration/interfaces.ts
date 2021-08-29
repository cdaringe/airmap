export type CallbackDoc = {
  description: string;
  downloadUrl?: string;
  driveSuccess: boolean;
  embedUrl: string;
  iconUrl: string;
  id: string;
  isShared: boolean;
  lastEditedUtc: number;
  mimeType: string;
  name: string;
  rotation: number;
  rotationDegree: number;
  serviceId: string;
  sizeBytes: number;
  type: string;
  uploadState?: string;
  url: string;
};

export type PickerCallback = {
  action: string;
  docs: CallbackDoc[];
};

export type authResult = {
  access_token: string;
  authuser: string;
  client_id: string;
  cookie_policy: string;
  error: boolean | undefined;
  expires_at: string;
  expires_in: string;
  issued_at: string;
  login_hint: string;
  response_type: string | undefined;
  scope: string;
  session_state: null;
  status: { signed_in: boolean; method: string; google_logged_in: boolean };
  token_type: string;
};

export type PickerConfiguration = {
  clientId: string;
  customScopes?: string[];
  developerKey: string;
  disableDefaultView?: boolean;
  token?: string;
  viewId?: google.picker.ViewId;
};
