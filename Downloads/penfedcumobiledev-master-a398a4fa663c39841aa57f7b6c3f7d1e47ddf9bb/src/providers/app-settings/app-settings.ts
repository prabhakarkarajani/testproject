import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
import { DepositPage } from '../../pages/deposit/deposit';
import { ToolsPage } from '../../pages/tools/tools';
import { AccountsPage } from '../../pages/accounts/accounts';
import { ContactPage } from '../../pages/contact/contact';
import { PaymentsPage } from '../../pages/payments/payments';
import { ProductsPage } from '../../pages/products/products';
import { SettingsPage } from '../../pages/settings/settings';
import { UnderConstructionPage } from '../../pages/under-construction/under-construction';
import { LoginPage } from '../../pages/login/login';
import { CheckingPage } from '../../pages/checking/checking';
import { ExplorePage } from '../../pages/explore/explore';
import { IrasPage } from '../../pages/iras/iras';
import{AutoLoansPage} from'../../pages/auto-loans/auto-loans';
import{CertificatesPage} from'../../pages/certificates/certificates';
import{SavingsPage} from'../../pages/savings/savings';
import{OtherVehicleLoansPage} from'../../pages/other-vehicle-loans/other-vehicle-loans';
import{CreditCardsPage} from'../../pages/credit-cards/credit-cards';
import{PersonalLoansPage} from'../../pages/personal-loans/personal-loans';
import{MortgagesPage} from'../../pages/mortgages/mortgages';

/*
  Generated class for the AppSettingsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppSettingsProvider {

  public pages: any;

  constructor() {

    this.pages = [
      { title: 'ACCOUNTS', component: AccountsPage, iconName: 'list-box' },
      {
        title: 'DEPOSITS & TRANSFERS', component: DepositPage, iconName: 'shuffle', subpages: [{ title: 'MAKE DEPOSIT' },
		        { title: 'TRANSFER MONEY' }, { title: 'SCHEDULED TRANSFERS' }], flag: false
      },
      {
        title: 'PAYMENTS', component: PaymentsPage, iconName: 'logo-usd', subpages: [{ title: 'MAKE PAYMENT' },
		        { title: 'SCHEDULED PAYMENTS' }], flag: false
      },
      {
        title: 'TOOLS', component: ToolsPage, iconName: 'hammer', subpages: [
		        { title: 'APPLICATION STATUS' },
		        { title: 'TRAVEL NOTIFICATIONS' },
		        { title: 'FIND AN ATM/BRANCH' },
		        { title: 'INBOX' },
		        { title: 'ARTICLES & ADVICE' }
		      ], flag: false
      },
      {
        title: 'PRODUCTS', component: ProductsPage, iconName: 'car', subpages: [
		        { title: 'CURRENT RATES & OFFERS',component:ExplorePage },
		        { title: 'CREDIT CARDS',component:CreditCardsPage },
		        { title: 'AUTO LOANS', component:AutoLoansPage},
		        { title: 'MORTGAGES',component:MortgagesPage },
		        { title: 'PERSONAL LOANS',component:PersonalLoansPage },
		        { title: 'OTHER VEHICLE LOANS',component:OtherVehicleLoansPage },
		        { title: 'CHECKING',component:CheckingPage },
            { title: 'SAVINGS',component:SavingsPage },
		        { title: 'CERTIFICATES',component:CertificatesPage },
		        { title: 'IRAS',component:IrasPage }
		      ], flag: false
      },
      { title: 'SETTINGS', component: SettingsPage, iconName: 'settings' },
      // { title: 'Under Construction', component: UnderConstructionPage, iconName: 'settings' },
      { title: 'CONTACT US', component: ContactPage, iconName: 'chatboxes' },
      { title: 'LOG OUT', component: LoginPage, iconName: 'lock' }
    ];
  }

  resetFlag() {
    for(let f in this.pages) {
      if (this.pages[f].subpages) {
        this.pages[f].flag = false;
      }
    }
  }

}
