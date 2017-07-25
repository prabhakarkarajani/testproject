import { Component } from '@angular/core';
import { Alert,IonicPage, NavController,AlertController,LoadingController, NavParams } from 'ionic-angular';
import {AccountsServiceProvider} from '../../providers/accounts-service/accounts-service';
import {  AccountsPage} from '../accounts/accounts';
import * as _ from "lodash";
import { SessionManager } from '../core/session-manager';
import { CONST } from '../core/const';
import {  SettingsPage} from '../settings/settings';

/**
 * Generated class for the AccountShowhidePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-showhide',
  templateUrl: 'account-showhide.html',

})
export class AccountShowhidePage {

    public loading:any;
    public accountsList:any;
    public iraAccountsList:any;
    private actList:any;
    private iraList:any;
    private modifiedActList:any =[];
    public showIRAAccount:boolean = false;
    public showCertificate:boolean = false;
    public IRACertificateText:string = "";
     public IRAText:string = CONST.showhideAccount.IRAText;
      public MMCText:string = CONST.showhideAccount.MMCText;
      


    constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams,
    public loadingCtrl: LoadingController, 
    private httpProvider:AccountsServiceProvider) {

      this.loading = this.loadingCtrl.create({
        content:`<ion-spinner></ion-spinner>`
      });
   
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad AccountShowhidePage');
      this.getAccountsdata();
      this.getIRAAccountsData();
    }

    ngOnInit() {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.getAccountsdata();
      this.getIRAAccountsData();
    }
    //getting modified accounts info
    getModifiedAccounts(){
      this.modifiedActList=[];
      //Checking/save accounts
      if(this.accountsList.checkSaveAccounts.length != 0){
        for (let orgAct of this.actList.checkSaveAccounts) {
          for (let modifiedAct of this.accountsList.checkSaveAccounts) {
            if(orgAct.accountMask == modifiedAct.accountMask && orgAct.showAccount != modifiedAct.showAccount){
              this.modifiedActList.push(modifiedAct.accountMask);
              break;
            }
          }   
        }
      }
      //LoanAccounts
      if(this.accountsList.loanAccounts.length != 0){
        for (let orgAct of this.actList.loanAccounts) {
          for (let modifiedAct of this.accountsList.loanAccounts) {
            if(orgAct.accountMask == modifiedAct.accountMask && orgAct.showAccount != modifiedAct.showAccount){
              this.modifiedActList.push(modifiedAct.accountMask);
              break;
            }
          }   
        }
      }
      //MortgageAccounts
      if(this.accountsList.mortgageAccounts.length != 0){
        for (let orgAct of this.actList.mortgageAccounts) {
          for (let modifiedAct of this.accountsList.mortgageAccounts) {
              if(orgAct.accountMask == modifiedAct.accountMask && orgAct.showAccount != modifiedAct.showAccount){
              this.modifiedActList.push(modifiedAct.accountMask);
              break;
            
            }
          }   
        }
      }
      //creditCardAccounts  
      if(this.accountsList.creditCardAccounts.length != 0){
        for (let orgAct of this.actList.creditCardAccounts) {
          for (let modifiedAct of this.accountsList.creditCardAccounts) {
              if(orgAct.accountMask == modifiedAct.accountMask && orgAct.showAccount != modifiedAct.showAccount){
              this.modifiedActList.push(modifiedAct.accountMask);
              break;
            }
          }   
        }
      }
      //externalAccounts
      if(this.accountsList.externalAccounts.length != 0){
        for (let orgAct of this.actList.externalAccounts) {
          for (let modifiedAct of this.accountsList.externalAccounts) {
            if(orgAct.accountMask == modifiedAct.accountMask && orgAct.showAccount != modifiedAct.showAccount){
              this.modifiedActList.push(modifiedAct.accountMask); 
              break;
            }
          }   
        }
      }

      console.log(this.modifiedActList);
    }
    //getting accounts data
    getAccountsdata(): void {
      let sessionManager = SessionManager.singletonInstance(); 
      this.accountsList=sessionManager.accountsList;
       this.actList = _.cloneDeep(this.accountsList);
       }
    //getting IRA accounts data
    getIRAAccountsData(): void{
       let sessionManager = SessionManager.singletonInstance(); 
       if(sessionManager.IRAAccounts !=null){
        this.iraAccountsList = sessionManager.IRAAccounts;
         this.iraList = _.cloneDeep(this.iraAccountsList);
       }
       else {
      this.httpProvider.getIRACertificates().subscribe(
      result=>{ this.iraAccountsList=result;
        sessionManager.IRAAccounts = result;
        console.log('success',this.iraAccountsList);   
        this.iraList = _.cloneDeep(this.iraAccountsList);
      },
      err =>{
        console.error('Error',err);
      })
    }
    //
    if(this.iraAccountsList.iraAccounts !=null && this.iraAccountsList.iraAccounts.length >0){
      this.showIRAAccount = true;
      this.IRACertificateText = "IRA";
    }
    if(this.iraAccountsList.certificateAccounts !=null && this.iraAccountsList.certificateAccounts.length >0){
      this.showCertificate = true;
      if (this.IRACertificateText !=''){
        this.IRACertificateText = CONST.showhideAccount.IRAMMCText;
      }else{
        this.IRACertificateText = CONST.showhideAccount.Certificates;
      }
    }
    
    }
    //SaveSettings button 
    //Update account show-hide values
  updateShowHideAccounts(){
    console.log("update................."+this.accountsList.checkSaveAccounts[0].showAccount);
     //pass mask account ids in array
     //IRA and Certificate as flag
      this.httpProvider.updateHideAccounts( this.modifiedActList,this.showIRAAccount,this.showCertificate);
  }
 
     //SaveSettings button 
    updateShowHideStaus() {
     
      this.getModifiedAccounts();
      this.updateShowHideAccounts();
        if(this.modifiedActList.length == 0) {
          let alert = this.alertCtrl.create({
          title: 'Sorry.',
          cssClass: 'myPopup',
          subTitle: CONST.showhideAccount.noChangeMsg,
          buttons: ['Ok']
          }); 
          alert.present();
      }
      else {
        this.navCtrl.push(SettingsPage);
      }
    } 
    //close icon in nav bar
    close() {
      this.getModifiedAccounts();
      if(this.modifiedActList.length != 0) {
        let alert = this.alertCtrl.create({
        title: "We're sorry.",
        cssClass: 'myPopup',
        subTitle: CONST.showhideAccount.unknownErrorMsg,
        buttons: ['Ok']
        }); 
        alert.present();
      }
      else {
        this.navCtrl.push(SettingsPage);
      }
    }
    //checking toggle status and name
    notify(event,name) {
      console.log("toggled: "+ event.checked);
      console.log("toggled name: "+ name);
      console.log("SHOW"+ this.showIRAAccount);
    }
}
