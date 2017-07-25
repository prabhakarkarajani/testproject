import { Injectable } from '@angular/core';
import { Http, Response, Headers ,RequestOptions} from '@angular/http';
import { resolve } from 'dns';
import { Observable } from 'rxjs/Rx';
import { Platform } from 'ionic-angular';
import{MailingAddress} from '../../pages/update-mailing-address/mailing-address';
import { AppSettings } from '../../pages/core/app-settings';
/*
  Generated class for the MailingAddressServiceProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class MailingAddressServiceProvider {
  private appSettings: AppSettings;
  constructor(public http: Http,private platform: Platform) {
    
    console.log('Hello MailingAddressServiceProvider Provider');
    
  }
  
  /*  get the update mailing address services data */
   getMallingAddressData():Observable<MailingAddress> {
     this.appSettings =  AppSettings.singletonInstance();
     let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.contact.getMailingAddressUrl;
    console.log('MAILING ADD:::'+serviceUrl);
let header= new Headers({"Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
 if (this.platform.is('cordova') && this.platform.is('android')) {
       // this._url =  CONFIG.mailingAddress.getMailingAddress;
        //serviceUrl =  CONFIG.deviceBaseUrl+CONFIG.mailingAddress.getMailingAddress;
    }
    
    return this.http.get(serviceUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
 
 updateMailingAddressData(formData:any){
   let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.contact.getMailingAddressUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  this.http.post(serviceUrl, {formData},options)
    .map(this.extractData)
      .catch(this.handleError);
 
 }

  private extractData(res: Response) {
    let body = res.json();
    console.log('response', body);
    return body|| { };
  }
  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
    
   /* getCountries(){
      return this.http.get('https://raw.githubusercontent.com/annexare/Countries/master/countries.json').map(res=>res.json());
    }*/
}
