export interface LicenseApiResponse {
  status: LicenseApiResponseStatus;
}

export enum LicenseApiResponseStatus {
  OK = "OK",
  Expires = "EXPIRED",
  Failed = "FAILED"
}