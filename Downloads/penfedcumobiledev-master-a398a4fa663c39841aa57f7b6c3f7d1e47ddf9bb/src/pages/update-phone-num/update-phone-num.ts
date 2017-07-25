import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ContactInfoPage } from '../contact-info/contact-info';
import { Http} from '@angular/http';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { UpdatePhonenumberServiceProvider } from '../../providers/update-phonenumber-service/update-phonenumber-service';
import { SecurityPage } from '../security/security';

/**
 * Generated class for the UpdatePhoneNumPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-phone-num',
  templateUrl: 'update-phone-num.html',
  providers: [ContactInformationProvider,UpdatePhonenumberServiceProvider]
})
export class UpdatePhoneNumPage {


  public endPoints = "https://mobile-qa.penfed.org/webapp/rest/private/settings/contactphone";
  public dayTimePhoneNumber: number;
  public eveningNumber: number;
  public cellNumber: number;
  public emailAddress: any;
  public userName: string;

  public phone = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public phoneNumberService: ContactInformationProvider, public updatePhoneNumber:UpdatePhonenumberServiceProvider) {
  }
  // registerUser(form: NgForm) {
  //   this.updatePhoneNumber.updatePhoneNumber()
  //     .subscribe(data => console.log(data));

  //     .map(data => console.log(data));
  //     // .subscribe(data=>{
  //     //   console.log(data);
  //     // });
  //   //console.log(this.phone);
   //}
  popView() {
    this.navCtrl.pop();
  }
  ngOnInit() {
    return this.phoneNumberService.getContactInfo()
      .subscribe(res => {
        let result = res.json();
        this.dayTimePhoneNumber = result.dayTimePhone;
        this.eveningNumber = result.eveningPhone;
        this.cellNumber = result.cellPhone;
        console.log(this.dayTimePhoneNumber);
      })
  }
  goContactInfoPage(){
    this.navCtrl.push(SecurityPage);
  }

}
