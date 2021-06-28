export interface LicenseApiResponse {
  status: LicenseApiResponseStatus;
}

export enum LicenseApiResponseStatus {
  OK = "OK",
  Activated = "ACTIVATED",
  Expires = "EXPIRED",
  Failed = "FAILED"
}