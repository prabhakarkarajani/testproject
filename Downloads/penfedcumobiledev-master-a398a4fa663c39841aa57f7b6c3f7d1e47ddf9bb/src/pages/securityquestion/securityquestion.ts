import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelploginPage } from '../../pages/helplogin/helplogin';
import { LoginPage } from '../../pages/login/login';
import { ApiService } from '../../providers/api-service';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';
/**
 * Generated class for the SecurityquestionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

interface securePageData {
  _body?: string
}

@IonicPage()
@Component({
  selector: 'page-securityquestion',
  templateUrl: 'securityquestion.html',
})
export class SecurityquestionPage {

  public securityAnswer: any;
  public deviceToken: any;
  public counterValue: number;
  public securityQuestionForm: FormGroup;
  public counter : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiService, public localStorage: Storage) {

    this.securityQuestionForm = new FormGroup({
      secureAnswer: new FormControl('', []),
      saveDevice: new FormControl(false, [])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecurityquestionPage');
  }
  savedevice() {
    this.api.getDeviceInformation().subscribe(
      (res: securePageData) => {
        console.log(res);
        localStorage.set("deviceInformation", res);
      }, (err) => {
        console.log("Error Block...!");
      }, () => {
        console.log("Finally Block...!");
      })

    this.localStorage.ready().then(() => {
      this.localStorage.get('deviceInformation').then((data) => {
        if (data != null) {
          this.deviceToken = data;
        }
      });
    });
    this.saveDeviceService(this.deviceToken);
  }
  saveDeviceService(deviceToken) {
    this.api.saveDevice(deviceToken).subscribe(
      (res: securePageData) => {
        console.log(res);

      }, (err) => {
        console.log("Error Block...!");
      }, () => {
        console.log("Finally Block...!");
      })
  }
  submitSecurityQuestion(securityQuestionForm) {
    this.counter += 1;

    if(this.counter <= 3){
      this.api.saveSecurityQuestionResp(securityQuestionForm.value.secureAnswer).subscribe(
        (res: securePageData) => {
          console.log(res);
            //Security Answer Validating login-content

            this.api.securityAnswerValidate(securityQuestionForm.value.secureAnswer).subscribe(
              (res: securePageData) => {
                console.log(res);
                if(res){
                  this.navCtrl.push(LoginPage);
                }else{
                  this.navCtrl.push(SecurityquestionPage);
                }

              }, (err) => {
                console.log("Error Block...!");
              }, () => {
                console.log("Finally Block...!");
              })

        }, (err) => {
          console.log("Error Block...!");
        }, () => {
          console.log("Finally Block...!");
        })
    } else {
      console.log("It should go to Account Locked Page");
      //this.navCtrl.push(AccountLockedPage);
    }
  }

  differentUserLogin() {
    this.navCtrl.push(LoginPage);
  }
  helpLoggingIn() {
    this.navCtrl.push(HelploginPage);
  }
  cancelView() {
    this.navCtrl.push(LoginPage);
  }
}
