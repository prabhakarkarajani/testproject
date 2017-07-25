import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
//import { PasswordValidation } from '../../pipes/changePasswordValidation';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  changePasswordForm: FormGroup;
  public display: boolean;
  public buttonValidate: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
    this.changePasswordForm = fb.group({
      currentpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(/^(?=.*\d){1,16}\S+$/)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(6)]]
      // }, {
      //     validator: PasswordValidation.MatchPassword // validation method
    })
  }

  onBlurMethod() {
    let password = this.changePasswordForm.controls.newpassword.value; // to get value in input tag
    let confirmPassword = this.changePasswordForm.controls.repeatpassword.value; // to get value in input tag
    if (password.length != confirmPassword.length) {
      this.buttonValidate = true;
    } else {
      this.buttonValidate = false;
    }
    //console.log("V=" + this.buttonValidate)
    if (password != confirmPassword) {
      if (confirmPassword == "") {
        this.display = false;
      } else {
        console.log('false');
        this.display = true;
      }
    } else {
      console.log('true');
      this.display = false;
    }
  }
  popView() {
    this.navCtrl.pop();
  }

}
