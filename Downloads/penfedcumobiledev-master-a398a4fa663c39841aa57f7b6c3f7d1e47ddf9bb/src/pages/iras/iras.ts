import { Component,ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams } from 'ionic-angular';
import { Platform, Slides, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import {ProductServiceProvider} from '../../providers/product-service/product-service';
//import {CreditCardServiceProvider} from '../../providers/credit-card-service/credit-card-service'
//import { AppSettingsProvider } from '../providers/app-settings/app-settings';
//import { GetTimeoutValueProvider } from "../providers/get-timeout-value/get-timeout-value";
//import {LogoutProvider} from "../providers/logout/logout";

/**
 * Generated class for the IrasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-iras',
  templateUrl: 'iras.html'
})
export class IrasPage {
 public extraOptions;
    iraData: any;
    theClickedIndex: number;
    name: any;
    tagline: any;
    rateOfInterest: any;
    rateType: any;
    ccInfoDefaultPurchase: any;
    considerationsText: any;
    features: any;
    featuresText: any;
    nextSlide: String;
    prevSlide:String;
    @ViewChild(Slides) slider: any;
  //  @ViewChild('mySlider') slider: Slides;
   // mySlider:any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private iraProvider:ProductServiceProvider,public viewCtrl: ViewController) {
        this.getIRAProduct();
        
    }
    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('CREDIT CARDS');
        this.getIRAProduct();
    }
    

    getIRAProduct(){
        let products;
        return this.iraProvider.getProducts().subscribe(
        result => { products = result;
            console.log("products loading",products);
            this.iraData = products.filter(function(el) {
        
            return el.categoryId == 4;
            });
            console.log('rel', this.iraData[0])
            return this.iraData.length > 0 ? true :false;
            })
    }
   
}
