import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UpdatePhoneNumPage } from '../update-phone-num/update-phone-num';

import {UpdateMailingAddressPage} from '../update-mailing-address/update-mailing-address';
import { UpdateEmailPage } from '../update-email/update-email';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ContactInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({

  selector: 'page-contact-info',
  templateUrl: 'contact-info.html',
  providers: [ContactInformationProvider]
})
export class ContactInfoPage {


  public dayTimePhoneNumber: number;
  public eveningNumber: number;
  public cellNumber: number;
  public primaryEmailAddress:any;
  public secondaryEmail:any;
  public userName:string;
  public showPhone: boolean;
  public showEmail:boolean;
  public streetAddress:any;
  public cityAddress:any;
  public stateAddress:any;
  public zip:number;

  public phoneNumber: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public phoneNumberService: ContactInformationProvider) {


  }

  //back to previous page;
  popView() {
    this.navCtrl.pop();
  }
  //go to edit phone number
  goToEditPhoneNumPage() {
    this.navCtrl.push(UpdatePhoneNumPage);
  }
  goToUpdateMailingAddress(){
    console.log('trigger');
    this.navCtrl.push(UpdateMailingAddressPage);
  }
goToEditEmailPage() {
    this.navCtrl.push(UpdateEmailPage);
}

  ngOnInit() {

    return this.phoneNumberService.getContactInfo()
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        this.dayTimePhoneNumber = result.dayTimePhone;
        this.eveningNumber = result.eveningPhone;
        this.cellNumber = result.cellPhone;
        if (this.cellNumber) {
          this.showPhone = true;
        }
        this.primaryEmailAddress = result.primaryEmail;
        this.secondaryEmail = result.secondaryEmail;
        this.streetAddress = result.mailingAddress1;
        this.cityAddress = result.mailingCity;
        this.stateAddress = result.mailingState;
        this.zip = result.mailingZip;
      
        if(this.secondaryEmail){
          this.showEmail = true;
        }
        this.userName = result.userDisplayName;
      })

  }

}
