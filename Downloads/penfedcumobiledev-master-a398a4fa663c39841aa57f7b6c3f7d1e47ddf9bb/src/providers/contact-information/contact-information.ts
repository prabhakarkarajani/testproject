import { Injectable } from '@angular/core';
//import { Http,RequestOptions,Headers } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import { AppSettings } from '../../pages/core/app-settings';

/*
  Generated class for the ContactInformationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ContactInformationProvider {


  constructor(public http: Http) {
  }

  getContactInfo() {
    //return this.http.get('https://mobile-qa.penfed.org/webapp/rest/private/settings/contactinfo')
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //let options = new RequestOptions({ headers: headers, withCredentials: true });
    //return this.http.get('http://10.182.6.165:8080/webapp/rest/private/settings/contactinfo', options);
  ///  return this.http.get('https://mobile-qa.penfed.org/webapp/rest/private/settings/contactinfo');

       let appSettings = AppSettings.singletonInstance();
    let url=appSettings.serviceUrls.baseUrl +appSettings.serviceUrls.contact.contactInfoUrl;
  //  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
   // let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(url);
  }
}
