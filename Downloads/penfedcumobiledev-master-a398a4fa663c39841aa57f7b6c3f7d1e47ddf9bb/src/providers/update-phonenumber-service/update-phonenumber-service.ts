import { Injectable } from '@angular/core';

import { Http, RequestOptions, Headers} from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../pages/core/app-settings';

//import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
//import { NgForm } from '@angular/forms';
/*
  Generated class for the UpdatePhonenumberServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UpdatePhonenumberServiceProvider {
   constructor(public http: Http) {

  }

  updatePhoneNumber() {
     let appSettings = AppSettings.singletonInstance();
    let url=appSettings.serviceUrls.baseUrl +appSettings.serviceUrls.contact.updateContactPhone;

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var data = "cellNumber=123455&t=9214f42d08087293aa2b7d28d366d8f60afbd93b";

    return this.http.post(url, data, options);
  }
}
