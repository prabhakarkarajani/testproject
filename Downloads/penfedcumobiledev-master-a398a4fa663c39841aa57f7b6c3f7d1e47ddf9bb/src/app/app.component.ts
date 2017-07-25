import { Component, ViewChild, OnInit} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
//import { DepositPage } from '../pages/deposit/deposit';
//import { ToolsPage } from '../pages/tools/tools';
//import { AccountsPage } from '../pages/accounts/accounts';
//import { ContactPage } from '../pages/contact/contact';
//import { PaymentsPage } from '../pages/payments/payments';
//import { ProductsPage } from '../pages/products/products';
import { SettingsPage } from '../pages/settings/settings';
import { UnderConstructionPage } from '../pages/under-construction/under-construction';

import { LoginPage } from '../pages/login/login';
import { AppSettingsProvider } from '../providers/app-settings/app-settings';
import { HttpModule } from "@angular/http";
// import { Keyboard } from '@ionic-native/keyboard';
import { GetTimeoutValueProvider } from "../providers/get-timeout-value/get-timeout-value";
import {LogoutProvider} from "../providers/logout/logout"
import { ResetAccountsDataProvider } from "../providers/reset-accounts-data/reset-accounts-data";

import { IrasPage } from '../pages/iras/iras';
import { CheckingPage } from '../pages/checking/checking';
import { SavingsPage } from '../pages/savings/savings';
import { CreditCardsPage } from '../pages/credit-cards/credit-cards';
import { AutoLoansPage } from '../pages/auto-loans/auto-loans';

@Component({
  templateUrl: 'app.html',
  providers: [AppSettingsProvider]
})
export class AppComponent implements OnInit {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: any;

  ngOnInit() {
    this.pages = this.appSetting.pages;
  }


  public sessionTimeout: any;
  public sessionTimer: number;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public menuCtrl: MenuController, public http: HttpModule,
    public getTimeout: GetTimeoutValueProvider,
    public appSetting: AppSettingsProvider,
    public logout: LogoutProvider, public resetAccountsData: ResetAccountsDataProvider) {

    platform.ready().then(() => {
            // do whatever you need to do here.
            setTimeout(() => {
              splashScreen.hide();
            }, 100);
    });

    this.sessionTimer = this.getTimeout.getTimeout();
    // keyboard.disableScroll(true);
    platform.pause.subscribe(() => {
      this.sessionTimeout = new Date();
      console.log('pause app', this.sessionTimeout);
    });
    platform.resume.subscribe(() => {
      let timeIn:any = new Date();

      if ((timeIn.getTime() - this.sessionTimeout.getTime()) < this.sessionTimer) {
        console.log('still active');
      } else {
        this.logout.sessionLogout().subscribe(res=>{
          // console.log(res);
        });
        this.resetAccountsData.resetData();
        alert('Your Session Has Timed Out; Please Log In Again To Continue.');
        this.nav.push(LoginPage)
      }
    });


  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goToPage(sub) {
    this.nav.setRoot(sub.component);
  }

  // submenu dropdown collapse
  getMenuActive(show) {
    if (this.menuCtrl.isOpen('sideMenu')) {
      return show = !show;
    } else {
      return false;
    }
  }
  // dropdown change color
  getSideNav(show) {
    if (this.menuCtrl.isOpen('sideMenu')) {
      return show = !show;
    } else {
      return this.menuCtrl.isOpen('sideMenu');
    }
  }
  // only one dropdown can be toggled
  dropDownCtrl(p) {
    if (p.flag) {
      p.flag = false;
    } else {
      this.appSetting.resetFlag();
      p.flag = true;
    }
  }
  //when menu close, reset all flag
  resetMenu() {
    this.appSetting.resetFlag();
  }

}
