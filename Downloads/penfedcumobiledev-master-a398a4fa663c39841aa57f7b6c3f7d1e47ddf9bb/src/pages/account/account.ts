import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AccountHeaderActionsComponent } from "../accounts/account-header-actions";

/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  public showAccountDetails:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.showAccountDetails = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage', this.navParams);
  }

}
