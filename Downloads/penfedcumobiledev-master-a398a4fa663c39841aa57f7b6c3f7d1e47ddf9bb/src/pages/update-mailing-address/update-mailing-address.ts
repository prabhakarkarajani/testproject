import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { error } from 'util';
import { MailingAddressServiceProvider } from '../../providers/mailing-address-service/mailing-address-service';
import{ MailingAddress} from './mailing-address';
//import {CountryState} from '../../model/countries';
import {CountryStateProvider} from '../../providers/country-state/country-state';

/**
 * Generated class for the UpdateMailingAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-mailing-address',
  templateUrl: 'update-mailing-address.html',
  providers:[MailingAddressServiceProvider]
})
export class UpdateMailingAddressPage {
  public mailingForm:FormGroup;
  public loading:any;
  public mailingAddress:MailingAddress;
  public countries:any;
  public states:any;
  public isToggled: boolean;
  private sendMailingAdderss: any;
  public stateDisabled:boolean=false;
  public physicalStateDisabled:boolean=false;
  public getCountryName:string;
  private data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,public loadingCtrl: LoadingController, private httpProvider:MailingAddressServiceProvider , private countryStateProvider :CountryStateProvider) {
    this.isToggled = false;
    this.loading = this.loadingCtrl.create({
     content:`<ion-spinner></ion-spinner>`
   });
  
    this.getMailingAddress();
        this.mailingForm = this.fb.group({
     'mailingAddress1': ['',Validators.compose([Validators.required, Validators.maxLength(26)])],
     'mailingAddress2': ['',Validators.compose([Validators.required, Validators.maxLength(26)])],
     'mailingCity': ['',Validators.compose([Validators.required,Validators.maxLength(30)])],
     'mailingState':['',Validators.required],
     'mailingZip':['',Validators.required],
     'mailingCountry':['',Validators.required],
     'physicalAddress1': ['',Validators.compose([Validators.required, Validators.maxLength(26)])],
     'physicalAddress2': ['',Validators.compose([Validators.required, Validators.maxLength(26)])],
     'physicalCity':['',Validators.required],
     'physicalState':['',Validators.required],
     'physicalZip':['',Validators.required],
     'physicalCountry':['',Validators.required]
   });

}

notify(ev) {
  this.isToggled = ev.checked; 
}


  
  ionViewLoaded(){
    this.getMailingAddress();
    console.log('in View Loaded');
}
ionViewWillEnter(){
    this.getMailingAddress();
   console.log('view enter');
}
ionViewWillLeave(){
   console.log('view leave');
}
ionViewDidUnload(){
   console.log('view unload');
}

   getMailingAddress(): void{
    this.httpProvider.getMallingAddressData().subscribe(
      result=>{ this.mailingAddress=result;
        this.mailingAddress = this.mailingAddress;
         this.getCountries();
     this.getUSStates();
            },
      err =>{
        console.error('Error',err);
      },
      ()=>{
        //this.loading.dismiss();
      //  console.log('getData completed');
      }
    );
    
      
  }

  getCountries(){
    this.countryStateProvider.getCountries().subscribe(
      result=>{this.countries =result;
      },
      err =>{
        console.error('Error',err);
      },
      ()=>{
        //this.loading.dismiss();
        console.log('getData completed');
      
    })
  }

   getUSStates(){
    this.countryStateProvider.getStates().subscribe(
      result=>{this.states =result;
      },
      err =>{
        console.error('Error',err);
      },
      ()=>{
        //this.loading.dismiss();
        console.log('getData completed');
      
    })
  }

/*submit form data  */
submitUpdateMailingAddress(formdata){
  this.sendMailingAdderss = formdata;
 /*  if (!this.sendMailingAdderss) { return; }
  this.httpProvider.updateMailingAddressData( this.sendMailingAdderss);*/
  } 

  //get country code 
  getCountry(val,type){
    if(type =='mailingCountry' && val != 'United States')
    {
      this.stateDisabled = true;
    }else{
      this.stateDisabled = false;
    }

if(type =='physicalCountry' && val != 'United States'){
      this.physicalStateDisabled = true;
    }else{
      this.physicalStateDisabled = false;
     }

  }

 
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMailingAddress();
  }
}
