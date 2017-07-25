import { Injectable } from '@angular/core';
import { Http , Response, Headers ,RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../pages/core/app-settings';

/*
  Generated class for the ProductsExploreProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductsExploreProvider {

  private appSettings: AppSettings;

  constructor(public http: Http) {
    console.log('Hello ProductsExploreProvider Provider');
  }

 
    getProductsExplore(){
  this.appSettings =  AppSettings.singletonInstance();
     let productExploreUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.product.exploreUrl;
  return this.http.get(productExploreUrl).map(this.extractData)
      .catch(this.handleError);
}
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
