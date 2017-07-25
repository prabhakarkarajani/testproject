import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";
import { AppSettings } from '../../pages/core/app-settings';

/*
  Generated class for the AccountsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AccountsServiceProvider {
  public ApiEndpoint:any;
  private appSettings:any;

  constructor(public http: Http, public apiEndPoint: ApiEndpointProvider) {
    console.log('Hello AccountsServiceProvider Provider');
    this.ApiEndpoint = this.apiEndPoint.getEndpoint();
     this.appSettings = AppSettings.singletonInstance();
  }

  getRecentTransactions(AccountMaskVal){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(this.ApiEndpoint+"/rest/private/accounts/transactions/"+AccountMaskVal, options);
  }

  getCreditCardRewards(AccountMaskVal){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(this.ApiEndpoint+"/rest/private/accounts/rewards/"+AccountMaskVal, options);
  }
  getIRACertificates_old(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(this.ApiEndpoint+"/rest/private/accounts/certificates", options);
  }
  /* get the IRA accounts services data */
  getIRACertificates() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let url=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.IRAAccountsUrl;
       return this.http.get(url,options)
       .map(this.parseData)
       .catch(this.handleError);
    }
    /*  get the Accounts services data */
  getAccountsData() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
     let url=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.accountslsUrl;
        return this.http.get(url,options)
       .map(this.parseData)
       .catch(this.handleError);
     }

  private parseData(res: Response) {
    let body = res.json();
    console.log('response', body);
    return body|| { };
  }
  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
  
  //Update show hide IRA accounts
   updateHideAccounts(accountMasksToHide:any,showIRA:boolean,showMoneyMarket:boolean){
      let body = JSON.stringify({ accountMasksToHide,showMoneyMarket,showIRA }); 
   
      let url=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.updateShowHideAccountsUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
   
    this.http.post(url, body,options)
      .map(this.parseData)
      .catch(this.handleError);
 
  }

}
