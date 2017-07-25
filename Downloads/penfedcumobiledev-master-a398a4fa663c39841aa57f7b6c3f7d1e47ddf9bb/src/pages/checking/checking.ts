import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductServiceProvider} from '../../providers/product-service/product-service';

/**
 * 
 * Generated class for the CheckingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-checking',
  templateUrl: 'checking.html',
})
export class CheckingPage {
public checkingProduct :any;

     
  constructor(public navCtrl: NavController, public navParams: NavParams, private checkingProvider: ProductServiceProvider ) {
    this.getCheckingProduct();
  }

  ionViewDidLoad() {
    //this.productsService.load();
  }
getCheckingProduct(){
  let products;
  return this.checkingProvider.getProducts().subscribe(
    result => {products = result;
      console.log("products loading",products);
      this.checkingProduct = products.filter(function(el) {
  
    return el.categoryId == 3;
  
});
  console.log('rel', this.checkingProduct[0])
  return this.checkingProduct.length > 0 ? true :false;
    }
  )
}

}
