import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ContactInfoPage } from '../contact-info/contact-info';
import { ChangePasswordPage } from '../change-password/change-password';
import {AccountShowhidePage} from '../account-showhide/account-showhide';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {
  }
  goToContactInfoPage() {
    this.navCtrl.push(ContactInfoPage);
  }
  goToChangePasswordPage(){
    this.navCtrl.push(ChangePasswordPage);
  }
  goToAccountShowhide(){
      this.navCtrl.push(AccountShowhidePage);
    }

}
