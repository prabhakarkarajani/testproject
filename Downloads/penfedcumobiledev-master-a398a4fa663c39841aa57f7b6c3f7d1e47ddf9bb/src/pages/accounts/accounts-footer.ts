import { Component } from '@angular/core';
import { NavParams, 
  NavController, 
  ModalController, 
  // ViewController 
} from "ionic-angular";

// @Component({
//   selector:'ncua-cert',
//   template:`<h1> Federally Insured by NCUA`
// })
// export class NCUACert{
//   constructor(public viewCtrl: ViewController){
//     console.log('Showing NCUA Certification')
//   }
// }

@Component({
  selector: 'accounts-footer',
  templateUrl: 'accounts-footer.html'
})
export class AccountsFooterComponent{
  public pfDate:object;  
  public footerParams:object;
  constructor(public navParams: NavParams, public navCtrl: NavController, public modalCtrl:ModalController){
    this.footerParams = this.navParams;
    this.pfDate = new Date(); 
  }
  displayNCUACert(){
    // TODO: Build Modal to show NCUA Insured Certification
    console.log('TODO: Build Modal to show NCUA Insured Certification');
    // let ncuaCert = this.modalCtrl.create(NCUACert);
    // ncuaCert.present();  
  }
}
