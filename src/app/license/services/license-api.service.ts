import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LicenseApiResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LicenseApiService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public activate(key: string): Promise<void> {
    return this.http.patch(
      `/api/licenses/${key}`, {}, {
        params: {
          // eslint-disable-next-line camelcase
          is_provided: 'true',
          // eslint-disable-next-line camelcase
          is_activated: 'true',
        },
      },
    ).toPromise() as Promise<unknown> as Promise<void>;
  }

  public validate(key: string): Promise<LicenseApiResponse> {
    return this.http.get<LicenseApiResponse>(
      `/api/licenses/${key}/validate`,
    ).toPromise();
  }

}
