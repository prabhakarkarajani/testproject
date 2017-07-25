import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductServiceProvider} from '../../providers/product-service/product-service';
/**
 * Generated class for the AutoLoansPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auto-loans',
  templateUrl: 'auto-loans.html',
})
export class AutoLoansPage {
public autoLoansProduct :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private autoLoanProvider: ProductServiceProvider) {
     this.getAutoLoansProduct();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutoLoansPage');
  }

  getAutoLoansProduct(){
  let products;
  return this.autoLoanProvider.getProducts().subscribe(
    result => {products = result;
      console.log("products loading",products);
      this.autoLoansProduct = products.filter(function(el) {
  
    return el.categoryId == 1;
    
 
  
});
  console.log('rel', this.autoLoansProduct[0])
  return this.autoLoansProduct.length > 0 ? true :false;
    }
  )
}

}
