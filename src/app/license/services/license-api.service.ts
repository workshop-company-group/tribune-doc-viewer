import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { LicenseAPIResponse } from '../../shared/models'

@Injectable({
  providedIn: 'root'
})
export class LicenseApiService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public activate(key: string): Promise<void> {
    return this.http.patch<void>(
      `/api/licenses/${key}`, {}, {
        params: {
          is_provided: 'true',
          is_activated: 'true',
        }
      }
    ).toPromise();
  }

  public validate(key: string): Promise<LicenseAPIResponse> {
    return this.http.get<LicenseAPIResponse>(
      `/api/licenses/${key}/validate`
    ).toPromise();
  }

}
