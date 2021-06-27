export interface LicenseAPIResponse {
  status: LicenseAPIResponseStatus;
}

export enum LicenseAPIResponseStatus {
  OK = "OK",
  Expires = "EXPIRED",
  Failed = "FAILED"
}