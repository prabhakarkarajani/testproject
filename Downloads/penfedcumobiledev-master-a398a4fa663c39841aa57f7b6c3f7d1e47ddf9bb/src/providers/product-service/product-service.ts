import { Injectable } from '@angular/core';
import { Http, Response, Headers ,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
//import{CONFIG} from '../../pages/core/config';
import { AppSettings } from '../../pages/core/app-settings';
/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {
  private appSettings: AppSettings;
    constructor(public http: Http) {
    console.log('Hello ProductServiceProvider Provider');
  }
getProducts(){
  this.appSettings =  AppSettings.singletonInstance();
     let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.product.productUrl;
  return this.http.get(serviceUrl).map(this.extractData)
      .catch(this.handleError);
}

 
    
    getProductCategory(){
  this.appSettings =  AppSettings.singletonInstance();
     let productCategoryUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.product.categoryUrl;
  return this.http.get(productCategoryUrl).map(this.extractData)
      .catch(this.handleError);
}
 
  /*getProductsExplore(){
  this.appSettings =  AppSettings.singletonInstance();
     let productExploreUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.product.exploreUrl;
  return this.http.get(productExploreUrl).map(this.extractData)
      .catch(this.handleError);
  }*/
    private extractData(res: Response) {
    let body = res.json();
    console.log('response is', body);
    return body|| { };
  }
  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
}
