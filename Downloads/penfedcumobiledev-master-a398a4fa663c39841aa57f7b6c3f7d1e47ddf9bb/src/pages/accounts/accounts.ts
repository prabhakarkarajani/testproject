import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import {ApiService} from '../../providers/api-service';
import{AccountShowhidePage} from '../account-showhide/account-showhide';
import { ResetAccountsDataProvider } from "../../providers/reset-accounts-data/reset-accounts-data";
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { SessionManager } from '../core/session-manager';

/**
 * Generated class for the AccountsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  public resultJson: any;
  public body: any;
  public checkSaveAccounts:any = [];
  public checkSaveAccountsAsOfDate:string;
  public reditCardAccounts:any = [];
  public reditCardAccountsAsOfDate:string;
  public loanAccounts:any = [];
  public loanAccountsAsOfDate:string;
  public mortgageAccounts:any = [];
  public mortgageAccountsAsOfDate:string;
  public iraAccounts:any = [];
  public iraAccountsAsOfDate:string;
  public certificateAccounts:any = [];
  public certificateAccountsAsOfDate:string;
  public loading:any;
  private sessionManager:any;

  constructor(public navCtrl: NavController, public api:ApiService, 
  public loadingCtrl:LoadingController, public resetAccounts: ResetAccountsDataProvider, 
  public  accountsApi: AccountsServiceProvider) {

    this.resetAccounts.getResetEvent().subscribe(res=>{
      this.checkSaveAccounts.length = 0;
      this.checkSaveAccountsAsOfDate = null;
      this.loanAccounts.length = 0;
      this.loanAccountsAsOfDate = null;
      this.reditCardAccounts.length = 0;
      this.reditCardAccountsAsOfDate = null;
      this.mortgageAccounts.length = 0;
      this.mortgageAccountsAsOfDate = null;
      this.iraAccounts.length = 0;
      this.iraAccountsAsOfDate = null;
      this.certificateAccounts.length = 0;
      this.certificateAccountsAsOfDate = null;
    });
  }

ngOnInit() {
        this.getAccounts();
        this.getIRAAccountsData();
      }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }
  //private functions
  goToAccountShowhide(){
    this.navCtrl.push(AccountShowhidePage);
  }
  private  getAccounts() {
    this.sessionManager = SessionManager.singletonInstance(); 
      this.accountsApi.getAccountsData().subscribe(
      result=>{ 
        this.sessionManager.accountsList=result;
       // console.log('success',this.sessionManager.accountsList); 
        //update local object

        this.checkSaveAccounts = this.sessionManager.accountsList.checkSaveAccounts;
        this.checkSaveAccountsAsOfDate = this.checkSaveAccounts[0].asOfDate;
        this.loanAccounts = this.sessionManager.accountsList.loanAccounts;
        this.loanAccountsAsOfDate = this.loanAccounts[0].asOfDate;
        this.reditCardAccounts = this.sessionManager.accountsList.creditCardAccounts;
        this.reditCardAccountsAsOfDate = this.reditCardAccounts[0].asOfDate;
        this.mortgageAccounts=this.sessionManager.accountsList.mortgageAccounts;
        this.mortgageAccountsAsOfDate = this.mortgageAccounts[0].asOfDate;

     },
      err =>{
        console.error('Error',err);
      })
 }
   //getting IRA accounts data
   private  getIRAAccountsData(){
     this.sessionManager = SessionManager.singletonInstance(); 
      this.accountsApi.getIRACertificates().subscribe(
      result=>{ 
        this.sessionManager.IRAAccounts = result;
      this.iraAccounts= this.sessionManager.IRAAccounts.iraAccounts;
      this.iraAccountsAsOfDate = this.sessionManager.IRAAccounts.iraAccounts.length ? this.sessionManager.IRAAccounts.iraAccounts[0].asOfDate: null;
      this.certificateAccounts=this.sessionManager.IRAAccounts.certificateAccounts;
      this.certificateAccountsAsOfDate = this.sessionManager.IRAAccounts.certificateAccounts.length ? this.sessionManager.IRAAccounts.certificateAccounts[0].asOfDate: null;
      
        console.log('success',this.iraAccounts);   
   
      },
      err =>{
        console.error('Error',err);
         alert("Data Cannot be loaded at this time.");
      })
    } 
}
