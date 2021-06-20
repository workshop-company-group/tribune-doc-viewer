import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

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

  public validate(key: string): Promise<void> {
    return this.http.get<void>(
      `/api/licenses/${key}/validate`
    ).toPromise();
  }

}
