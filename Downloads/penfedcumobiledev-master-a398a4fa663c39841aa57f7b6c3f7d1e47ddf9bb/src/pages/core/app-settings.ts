import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, RequestOptions, Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

export class AppSettings {
 private static _instance: AppSettings = null;
 private  useLocalData: boolean = true;
 public serviceUrls:any;
 private httpProvider:Http;
public envJsonPath:string = "";
 constructor() {}

  static singletonInstance() {
        if (this._instance === null) {
            this._instance = new AppSettings();
        }
        return this._instance;
    }
  
private getBaseUrl(platform: Platform){
  var url:string = "../../";
 if(platform.is('cordova')){
   if(platform.is('android')){
      url ="/android_asset/www/";
   }else if (platform.is('ios')){
      url = "../www/";
   }
    }
    return url;
  }
public getServiceUrls(http:Http,platform: Platform){
 this.httpProvider = http;
 this.envJsonPath = this.getBaseUrl(platform);
//load env json
 this.getServiceEnvUrls().subscribe(
      result=>{ 
        this.serviceUrls = result;
        if(this.useLocalData == true){
          this.serviceUrls.baseUrl = this.envJsonPath + "assets/data/";
          console.log("PATH"+ this.serviceUrls.baseUrl );
        }
        })
}
  private getServiceEnvUrls(){
    var  url: string =this.envJsonPath +  "assets/data/env.json";  
     console.log("PATHSERVICE"+ url );
    if(this.useLocalData == true){
      url=  this.envJsonPath + "assets/data/localData.json";
    }
 console.log("PATHSERVICE"+ url );
  return this.httpProvider.get(url)
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

}
