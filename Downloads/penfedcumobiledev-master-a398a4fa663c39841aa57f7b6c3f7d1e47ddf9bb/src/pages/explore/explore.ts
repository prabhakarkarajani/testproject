import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductServiceProvider} from '../../providers/product-service/product-service';
import {ProductsExploreProvider} from '../../providers/products-explore/products-explore';
import {CategoryPipe} from '../../pipes/category';

import { CheckingPage } from '../checking/checking';
import { IrasPage } from '../iras/iras';
import{AutoLoansPage} from '../auto-loans/auto-loans';

import{CertificatesPage} from '../certificates/certificates';
import{SavingsPage} from '../.savings/savings';
import{OtherVehicleLoansPage} from'../other-vehicle-loans/other-vehicle-loans';
import{CreditCardsPage} from'../credit-cards/credit-cards';
import{PersonalLoansPage} from'../personal-loans/personal-loans';
import{MortgagesPage} from'../mortgages/mortgages';
/**
 * Generated class for the ExplorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import { AppSettings } from '../../pages/core/app-settings';

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'  
})
export class ExplorePage {
  private appSettings: AppSettings;
 private iconUrl =AppSettings.singletonInstance().serviceUrls.imgUrl;

  
  public exploreProduct: any;
  public productsTabs:any;
public productExpolre:any;
public productCategory:any;

constructor(public navCtrl: NavController, public navParams: NavParams, public productServiceProvider: ProductServiceProvider, private productExploreService: ProductsExploreProvider) {
 this.getProductsExplore(); 
  this.getProductCategory();

this.productsTabs= 'expolre';
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
    
  }


 getProductCategory(){
   let Category;
   this.productServiceProvider.getProductCategory().subscribe(
     result=>{ Category = result;
    this.productCategory =Category;
console.log('cateogry', this.productCategory);
}
   )
 }
   getProductsExplore(){
   let products;
  return this.productExploreService.getProductsExplore().subscribe(
    result => {products = result;
      this.productExpolre = products;
      console.log('eeee', this.productExpolre); 
 });
 }

 goToPage(product:string){
   console.log('before regx',product)
   let reg = new RegExp(" ","g");
    let page =  product.replace(reg,"");
    let component;
    /*if(page == 'IRAS'){
      page = 'Iras'
    }*/
    switch (page) {
    case 'Checking':
        this.navCtrl.push(CheckingPage);
        break;
    case 'Savings':
       // this.navCtrl.push(SavingsPage);
        break;
    case 'Certificates':
        this.navCtrl.push(CertificatesPage);
        break;
    case 'IRAs':
       this.navCtrl.push(IrasPage);
        break;
    case 'CreditCard':
        this.navCtrl.push(CreditCardsPage);
        break;
    case 'Mortgages':
        this.navCtrl.push(MortgagesPage);
        break;
    case  'AutoLoans':
        this.navCtrl.push(AutoLoansPage);
        break
    case 'PersonalLoans':
        this.navCtrl.push(PersonalLoansPage);
break;
        
        case 'AdventureLoans':
        //this.navCtrl.push(AdventureLoansPage);
        break;
       
        
}
   //   component.toString();
   //   console.log(typeof component,'type')
     //  page =page+"Page";
    //   console.log('component name is',page);
   // this.navCtrl.push(component)
 }
      
}
