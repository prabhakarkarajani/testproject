import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";
import { AppSettings } from '../../pages/core/app-settings';

/*
  Generated class for the LogoutProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LogoutProvider {
  public ApiEndpoint:any;
  constructor(public http: Http, public apiEndPoint: ApiEndpointProvider) {
    console.log('Hello LogoutProvider Provider');
    this.ApiEndpoint = this.apiEndPoint.getEndpoint();
  }

  sessionLogout(){
    let appSettings = AppSettings.singletonInstance();
    let url= appSettings.serviceUrls.login.logoutUrl;

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    console.log(this.apiEndPoint)
      return this.http.get(url, options);
  }
}
