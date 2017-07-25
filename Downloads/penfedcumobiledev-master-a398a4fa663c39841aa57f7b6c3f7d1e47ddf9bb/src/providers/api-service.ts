import { Injectable  } from '@angular/core';
import { Http,RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiEndpointProvider } from "./api-endpoint/api-endpoint";

//import { Observable } from "rxjs/Observable";

/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {

  public resultJson: any;
  public body: any;
  public checkSaveAccounts:any;
  public reditCardAccounts:any;
  public loanAccounts:any;
  public mortgageAccounts:any;
  public user:string;
  public pass:string;
  public hash:string;
  public ApiEndpoint:string;


  constructor(public http: Http, public api: ApiEndpointProvider) {
    console.log('Hello ApiService Provider');
    this.ApiEndpoint = this.api.getEndpoint();
  }
  setHash(hashVal:string){
    this.hash = hashVal;
  }
  beforeLogin(loginFormUsername){
         var data ="d="+this.api.getToken()+"&u="+loginFormUsername+"&clientVersion=2.7&buildNumber=6183";
      //var data = "j_username=174158&j_password=yyyy&hash=yyy&clientVersion=2.7&buildNumber=6183"
      //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': false });
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.post(this.ApiEndpoint+"/rest/public/login/JS", data, options);
  }
  firstRequest(){
    var data = "j_username=174158&j_password=yyyy&hash=yyy&clientVersion=2.7&buildNumber=6183";
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': false });
    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // let options = new RequestOptions({ headers: headers, withCredentials: true });
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.ApiEndpoint+"/j_security_check", data, options);
  }

  rsaRequest(user,pass){
    this.user = user;
    var data = "j_username="+user+"&j_password="+pass+"&hash="+this.hash+"&clientVersion=2.7&buildNumber=6183";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.ApiEndpoint+"/rest/public/login/JS", data, options);
  }

  login(user, pass){
    this.user = user;
    var data = "j_username="+user+"&j_password="+pass+"&hash="+this.hash+"&clientVersion=2.7&buildNumber=6183";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.ApiEndpoint+"/j_security_check", data, options);
  }

  secondRequest(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(this.ApiEndpoint+"/rest/private/accounts", options);
  }

  getCreditCardTransactions(){
    var data = 'accountMask=13b31635-f282-464a-a3ab-84ee5ba3dd83&statementPeriod=Recent';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.post(this.ApiEndpoint+"/rest/private/accounts/getCreditCardTransactions", data, options);
  }

  getLoanTransactions(AccountMaskVal){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(this.ApiEndpoint+"/rest/private/accounts/transactions/"+AccountMaskVal, options);
  }
  saveSecurityQuestionResp(secureAnswer){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(this.ApiEndpoint+"/rest/public/login/JS/confq/"+secureAnswer, options);
  }
  getDeviceInformation(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(this.ApiEndpoint+"/rest/private/settings/"+ options);
  }
  saveDevice(deviceInfo){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(this.ApiEndpoint+"/rest/private/settings/JS/"+deviceInfo, options);
  }
  securityAnswerValidate(secureAnswer){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(this.ApiEndpoint+"/rest/public/security/JS/"+options);
  }

}
