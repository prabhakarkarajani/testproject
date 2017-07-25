import { NgModule, ErrorHandler } from '@angular/core';
import { CategoryPipe } from '../pipes/category';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LocationsPage } from '../pages/locations/locations';
import { HelploginPage } from '../pages/helplogin/helplogin';
import { DepositPage } from '../pages/deposit/deposit';
import { ToolsPage } from '../pages/tools/tools';
import { PaymentsPage } from '../pages/payments/payments';
import { ProductsPage } from '../pages/products/products';
import { SettingsPage } from '../pages/settings/settings';
import { UnderConstructionPage } from '../pages/under-construction/under-construction';
import { LogoutPage } from '../pages/logout/logout';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import { ContactInfoPage } from '../pages/contact-info/contact-info';
import { ApiService } from '../providers/api-service';
import { AccountsPage } from '../pages/accounts/accounts';
import { AccountPage } from "../pages/account/account";
import { SecurityPage } from '../pages/security/security';
import { AccountHeaderComponent } from '../pages/accounts/account-header';
import { AccountRecentTransactionsComponent } from "../pages/account/account-recent-transactions";
import { AccountHeaderActionsComponent } from "../pages/accounts/account-header-actions";
import { AccountsFooterComponent } from '../pages/accounts/accounts-footer';
import { AccountListItemComponent } from '../pages/accounts/account-list-item';
import { UpdateMailingAddressPage} from '../pages/update-mailing-address/update-mailing-address';
import { UpdatePhoneNumPage} from '../pages/update-phone-num/update-phone-num';
import { UpdateEmailPage} from '../pages/update-email/update-email';
import { AccountShowhidePage} from '../pages/account-showhide/account-showhide';
import { IonicStorageModule } from '@ionic/storage'
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { CheckingPage } from '../pages/checking/checking';
import { ExplorePage } from '../pages/explore/explore';
import { IrasPage } from '../pages/iras/iras';
import { SavingsPage } from '../pages/savings/savings';
import { CreditCardsPage } from '../pages/credit-cards/credit-cards';
import { AutoLoansPage } from '../pages/auto-loans/auto-loans';
import{MortgagesPage} from'../pages/mortgages/mortgages';
import{OtherVehicleLoansPage} from'../pages/other-vehicle-loans/other-vehicle-loans';
import{PersonalLoansPage} from'../pages/personal-loans/personal-loans';
import{CertificatesPage} from'../pages/certificates/certificates';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowhideDirective } from '../directives/showhide/showhide';
import { Network } from '@ionic-native/network';

import { TruncatePipe } from "../pipes/truncate";
import { FormatPrice } from "../pipes/formatPrice";

// import { Keyboard } from '@ionic-native/keyboard';
import { GetTimeoutValueProvider } from "../providers/get-timeout-value/get-timeout-value";
import { SharedMortgageDataProvider } from '../providers/shared-mortgage-data/shared-mortgage-data';

import { ContactInformationProvider } from '../providers/contact-information/contact-information';
import { UpdatePhonenumberServiceProvider } from '../providers/update-phonenumber-service/update-phonenumber-service';
import { UpdatePasswordProvider } from '../providers/update-password/update-password';

import { AccountsServiceProvider } from '../providers/accounts-service/accounts-service';
import { ApiEndpointProvider } from '../providers/api-endpoint/api-endpoint';
import { LogoutProvider } from '../providers/logout/logout';
import { ResetAccountsDataProvider } from "../providers/reset-accounts-data/reset-accounts-data";

import { MailingAddressServiceProvider } from '../providers/mailing-address-service/mailing-address-service';
import { CountryStateProvider } from '../providers/country-state/country-state';
import { SecurityquestionPage } from "../pages/securityquestion/securityquestion";
import { FormatAccountNumberPipe } from '../pipes/format-account-number';
//Session Manager 
import { SessionManager } from '../pages/core/session-manager';
//App settings for loading all gloabl data before login
import { AppSettings } from '../pages/core/app-settings';
import { ProductBaseComponent } from '../components/product-base/product-base';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { ProudctcarouselComponent } from '../components/proudctcarousel/proudctcarousel';
import { ProductsExploreProvider } from '../providers/products-explore/products-explore';

@NgModule({
  declarations: [
    AppComponent,
    CategoryPipe,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    DepositPage,
    ToolsPage,
    PaymentsPage,
    ProductsPage,
    SettingsPage,
    UnderConstructionPage,
    LogoutPage,
    LocationsPage,
    HelploginPage,
    AccountsPage,
    AccountPage,
    ContactInfoPage,
    AccountHeaderComponent,
    AccountHeaderActionsComponent,
    AccountListItemComponent,
    UpdateMailingAddressPage,
    AccountRecentTransactionsComponent,
    AccountsFooterComponent,
    ShowhideDirective,
    AccountShowhidePage,
    TruncatePipe,
    ChangePasswordPage,
    CheckingPage,
    ExplorePage,
    IrasPage,
    OtherVehicleLoansPage,
    SavingsPage,
    CreditCardsPage,
    AutoLoansPage,
    MortgagesPage,
    CertificatesPage,
    PersonalLoansPage,
    FormatPrice,
    UpdatePhoneNumPage,
    UpdateEmailPage,
    SecurityquestionPage,
    SecurityPage,
ProductBaseComponent,
    ProudctcarouselComponent,
    FormatAccountNumberPipe
    
  ],
  imports: [
    BrowserModule,
    //BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(AppComponent,{
      scrollAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__nmpp',
         driverOrder: ['websql', 'sqlite', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    DepositPage,
    ToolsPage,
    ContactInfoPage,
    PaymentsPage,
    ProductsPage,
    SettingsPage,
    UnderConstructionPage,
    LogoutPage,
    LocationsPage,
    HelploginPage,
    AccountsPage,
    AccountPage,
    ChangePasswordPage,
    CheckingPage,
    ExplorePage,
    IrasPage,
    OtherVehicleLoansPage,
    SavingsPage,
    CreditCardsPage,
    AutoLoansPage,
    MortgagesPage,
    CertificatesPage,
    PersonalLoansPage,
    UpdateMailingAddressPage,
    AccountShowhidePage,
    SecurityquestionPage,
    UpdatePhoneNumPage,
    UpdateEmailPage,
    SecurityPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Storage,
    // Keyboard,
    ApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    GetTimeoutValueProvider,
    SharedMortgageDataProvider,

    ContactInformationProvider,
    UpdatePhonenumberServiceProvider,
    UpdatePasswordProvider,

    AccountsServiceProvider,
    ApiEndpointProvider,
    LogoutProvider,
    MailingAddressServiceProvider,
    CountryStateProvider,
    ResetAccountsDataProvider,
     SessionManager,
    AppSettings,
ResetAccountsDataProvider,
    ProductServiceProvider,
    ProductsExploreProvider
  ]
})
export class AppModule {}
