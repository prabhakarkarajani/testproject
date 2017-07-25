import { Injectable } from '@angular/core';
import {  Http, RequestOptions, Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {CountryState} from '../../model/countries';
import { AppSettings } from '../../pages/core/app-settings';

/*
  Generated class for the CountryStateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CountryStateProvider {

  constructor(public http: Http) {
    console.log('Hello CountryStateProvider Provider');
   
  }
 getCountries() {
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
   let appSettings =  AppSettings.singletonInstance();
   let countryUrl= appSettings.serviceUrls.baseUrl + appSettings.serviceUrls.contact.countriesUrl;
    return this.http.get(countryUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }
 getStates() {
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let appSettings =  AppSettings.singletonInstance();
   let statesUrl = appSettings.serviceUrls.baseUrl + appSettings.serviceUrls.contact.statesUrl;
    return this.http.get(statesUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  
 private extractData(res: Response) {
    let body = res.json();
   // console.log('response', body);
    return body|| { };
  }
  private handleError(error: Response) {
    //console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
}
