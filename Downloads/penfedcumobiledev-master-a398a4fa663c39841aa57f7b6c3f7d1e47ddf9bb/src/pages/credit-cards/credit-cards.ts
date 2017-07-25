import { Component,ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, Slides, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import {ProductServiceProvider} from '../../providers/product-service/product-service';
/**
 * Generated class for the CreditCardsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-credit-cards',
  templateUrl: 'credit-cards.html',
})
export class CreditCardsPage {

  creditCardData: any;
    theClickedIndex: number;
    name: any;
    tagline: any;
    title: any;
    low: any;
    apr: any;
    data: any;
    annualFee: any;
    featuresText: any;
    benefitsText:any;
    considerationsText: any;
    nextSlide: String;
    prevSlide:String;
    @ViewChild(Slides) slider: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private creditCardProvider:ProductServiceProvider,public viewCtrl: ViewController) {
        this.getCreditCardProduct();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditCardsPage');
    this.getCreditCardProduct();
  }

  getCreditCardProduct(){
        let products;
        return this.creditCardProvider.getProducts().subscribe(
        result => { products = result;
            console.log("products loading",products);
            this.creditCardData = products.filter(function(el) {
        
            return el.categoryId == 2;
            });
            console.log('rel', this.creditCardData[0])
            return this.creditCardData.length > 0 ? true :false;
            })
    }

}
