import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service';
import { AccountsPage } from '../accounts/accounts';
import { LoadingController, Platform, AlertController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContactPage } from '../../pages/contact/contact';
import { ProductsPage } from '../../pages/products/products';
import { LocationsPage } from '../../pages/locations/locations';
import { HelploginPage } from '../../pages/helplogin/helplogin';
//import { SecurityquestionPage } from '../../pages/securityquestion/securityquestion';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
//import { Subscription } from 'rxjs/Subscription';
import { AppSettings } from '../core/app-settings';
import { Http, RequestOptions, Headers,Response } from '@angular/http';

interface bootstrapResponse {
  _body?: string
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public resultJson: any;
  public body: any;
  private lastActivityTime: any;
  public greetString: String;
  public welcomeString = "WELCOME TO PENFED.";
  public showLoginForm: boolean = false;
  public loginForm: FormGroup;
  public readonly: boolean = false;
  public type = "password";
  public checkStatus = false;
  // public welcomeMember: String;
  public welcomeMemberFlag: boolean = false;
  public userName: String;
  public networkConnection: boolean;
  public connectionType: any;
  public saveUserName = false;
  private httpProvider:Http;
  // public disConnectedSubscription: Subscription;
  // public connectedSubscription: Subscription;

  constructor(private toast: ToastController, public platform: Platform, public api: ApiService,
    public loading: LoadingController, public formBuilder: FormBuilder, public navCtrl: NavController,
    private alertCtrl: AlertController, private view: ViewController, public localStorage: Storage,
    private network: Network,private http:Http) {
      this.httpProvider = http;
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(16)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])),
      saveUserName: new FormControl(false, []),
      enableTouchId: new FormControl(false, [])
    });
    this.networkCheck();
  }

  networkCheck() {
     this.platform.ready().then(() => {
      this.network.onDisconnect().subscribe((data) => {
        if (data.type == "offline") {
          this.connectionType = "No Internet Connection";
        }
        this.networkConnection = false;
        console.log('Network disconnected :-(');
        if (!this.networkConnection) {
          let alert = this.alertCtrl.create({
            title: "We're sorry!",
            subTitle: "You are not connected to the internet.Please connect and try your request again.",
            buttons: [
              {
                text: 'OK'
              }
            ]
          });
          alert.present();
        }
      });
      this.network.onConnect().subscribe((data) => {
        this.connectionType = data.type;
        this.networkConnection = true;
        console.log('Network connected!');
      });
      //console.log('network connected!'+this.connectedSubscription+""+this.disConnectedSubscription);
    });
  }

  //on page enter (ionViewDidLoad) check local storage and
  //  1. add username to input
  //  2. change togglestate to true
  //  3. show password field
  checkLocalStorage() {
    this.localStorage.ready().then(() => {
      this.localStorage.get('savedUser').then((data) => {
        if (data != null) {
          this.welcomeMemberFlag = true;
          this.userName = data;
          //this.showLoginForm = true;
          this.readonly = true;
          this.saveUserName = true;
        }
      });
    });
  }

  setLocalStorage() {
    this.localStorage.set("savedUser", this.loginForm.value.userName);
    this.localStorage.set("welcomeMemberFlag", true);

  }

  clearLocalStorage() {
    this.localStorage.clear();
    this.welcomeMemberFlag = false;
    // this.showLoginForm = false;
  }

  // on saveUsername Disable
  // 1. disable toggleSaveUserName
  // 2. remove username from localStorage
  // 3. hide password field

  // on save username enable
  // 1. Add available username to localStorage on login

  /* Logged In as a different user start */
  differentUserLogin() {
    this.localStorage.clear()
    this.navCtrl.push(LoginPage);
  }
  isReadOnly() {
    return this.readonly;
  }


  ionViewDidEnter() {
    //load url config
    let appSettings = AppSettings.singletonInstance();
      appSettings.getServiceUrls(this.httpProvider,this.platform);

    this.getWishMessage();
    this.localStorage.ready().then(() => {
      this.checkLocalStorage();
    });
    this.showLoginForm = false;
  }

  /*Added this method because of the Alert popup */
  ionViewWillEnter() {
    this.view.showBackButton(false);
  }

  showPassword() {
    console.log("Entering into showPassword");
    this.checkStatus = !this.checkStatus;
    if (this.checkStatus) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  private getWishMessage(): void {
    let currentDate = new Date();
    this.lastActivityTime = currentDate.getHours();
    console.log('Activity Time:::' + this.lastActivityTime);
    if (this.lastActivityTime >= 0 && this.lastActivityTime < 13) {
      this.greetString = 'GOOD MORNING';
    } else if (this.lastActivityTime >= 13 && this.lastActivityTime <= 17) {
      this.greetString = 'GOOD AFTERNOON';
    } else {
      this.greetString = 'GOOD EVENING'
    }
  }

  beforeLogin(loginForm) {

    this.networkCheck();
    console.log("In before login::::"+this.networkConnection);


    console.log(loginForm)
    if (loginForm.value.userName.length >= 5 && loginForm.value.userName.length <= 16) {
      this.showLoginForm = true;
      this.readonly = true;
    }
    loginForm.value.saveUserName?this.setLocalStorage():this.clearLocalStorage();

    this.api.beforeLogin(loginForm.value.userName).subscribe(
      (res: bootstrapResponse) => {
        console.log(res);
        let response = JSON.parse(res._body);
        console.log(response);
        console.log(response.accountExists);
        if (response != null && response.accountExists == false) {
          let alert = this.alertCtrl.create({
            title: 'Unable to Login!',
            subTitle: 'Username is invalid. Please try again',
            buttons: [
              {
                text: 'Try again',
                role: 'Try again',
                handler: () => {
                  this.navCtrl.push(LoginPage);
                }
              }
            ]
          });
          alert.present();
        }
        // else if(response.deviceToken == null){
        //    this.navCtrl.push(SecurityquestionPage);
        //  }
        else {
          this.api.setHash(response.securityHash);
        }
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: "We're sorry",
          subTitle: 'There was a connection timeout.Please check your connection and try again',
          buttons: [
            {
              text: 'OK',
              role: 'OK',
              handler: () => {
                this.navCtrl.push(LoginPage);
              }
            }
          ]
        });
        alert.present();
      }, () => {
        console.log("Finally Block...!");
      }
    )
  }



  /* login with username and password for accessing accounts information. */
  login(loginForm) {
    console.log(loginForm);
    if (loginForm.valid) {
      this.showLoginForm = true;
      this.readonly = true;
      let loader = this.loading.create({
        content: 'Logging in...',
      });
      loader.present();
      console.log(loginForm);
      this.navCtrl.push(AccountsPage);
   loader.dismiss();
   /* TODO RAMPAL - Uncomment it
      loginForm.value.saveUserName?this.setLocalStorage():this.clearLocalStorage();
      this.api.login(loginForm.value.userName, loginForm.value.password).subscribe(
        res => {
          console.log(res);
          this.navCtrl.push(AccountsPage);
          loader.dismiss();
        },
        err => {
          loader.dismiss();
          alert("There was an error");
        },
        () => {
          console.log("completed first req.. starting second");
        });
        */
    }

  }



  /* Navigating to Contact Page */
  contactPenFed() {
    this.navCtrl.push(ContactPage);
  }
  /* Navigating to Products Page */
  productInformation() {
    this.navCtrl.push(ProductsPage);
  }
  /* Navigating to Locations Page */
  locationsInformation() {
    this.navCtrl.push(LocationsPage);
  }
  /* Navigating to NeedHelpLoggingIn Page */
  helpLoggingIn() {
    this.navCtrl.push(HelploginPage);
  }
  /* It will show the alert popup if the user enter wrong username/memberId - No Limit */
  alertForNotListerUser() {
    let alert = this.alertCtrl.create({
      title: 'Unable to Login!',
      subTitle: 'Username is invalid. Please try again',
      buttons: [
        {
          text: 'Try again',
          role: 'Try again',
          handler: () => {
            this.navCtrl.push(LoginPage);

          }
        }
      ]
    });
    alert.present();
  }

}
