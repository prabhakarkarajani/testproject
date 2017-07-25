import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ContactInfoPage } from '../contact-info/contact-info';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SecurityPage } from '../security/security';

import 'rxjs/add/operator/map';
/**
 * Generated class for the UpdateEmailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-email',
  templateUrl: 'update-email.html',
  providers:[ContactInformationProvider]
})
export class UpdateEmailPage {
  public primaryEmail:any;
  public secondaryEmail:any;
  public userName:any;
  public display:boolean;
  user: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public updateEmailService:ContactInformationProvider,fb: FormBuilder) {
  this.user = fb.group({
        primaryemail: ['', [Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        secondaryemail: ['',[Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
  })
}

  goContactInfoPage(){
    this.navCtrl.push(SecurityPage);
  }
  popView() {
    this.navCtrl.pop();
  }
  ngOnInit(){
    return this.updateEmailService.getContactInfo()
      .subscribe(res => {
        let result = res.json();
        this.primaryEmail = result.primaryEmail;
        this.secondaryEmail = result.secondaryEmail;
        this.userName = result.userDisplayName;
      })
  }
  onBlurMethod(){
    if(this.user.controls.secondaryemail.value != ""){
      this.display = true;
    }
  }

}
