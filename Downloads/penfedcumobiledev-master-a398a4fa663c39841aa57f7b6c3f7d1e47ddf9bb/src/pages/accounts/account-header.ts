import { Component, Input } from '@angular/core';
import { NavController,NavParams } from "ionic-angular";
import { AccountsPage } from "./accounts";
import { SharedMortgageDataProvider } from "../../providers/shared-mortgage-data/shared-mortgage-data";
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";

/**
 * Generated class for the AccountHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
 
@Component({
  selector: 'account-header',
  templateUrl: 'account-header.html'
})
export class AccountHeaderComponent {
  public headerParams:any;
  public mortgageDetails:any = {
    escrowAmt: 'Loading...'
  };
  public rewardBalance:any;
  public rewardBalanceLabel:any;
  
  @Input() 
  public pageNameParam:string;

  constructor(public navParams: NavParams, public navCtrl:NavController, public mortgageData: SharedMortgageDataProvider, public accountsService: AccountsServiceProvider) {
    this.headerParams = navParams.data;
    if (this.headerParams)
    mortgageData.sharedMortgageData$.subscribe(details=>{
      this.mortgageData = details;
    })
    console.log(this)
  }
  ngOnInit(){
    if (this.headerParams.pageType=== "ACCOUNT_PAGE" && this.headerParams.payload.parentAcctType === 'CREDITCARD'){
      let data;
      this.accountsService.getCreditCardRewards(this.headerParams.payload.accountMask).subscribe(reward=>{
        data = reward;
        this.rewardBalance = JSON.parse(data._body).parameter;
        this.rewardBalanceLabel = JSON.parse(data._body).message;
      });
    }
    // if(this.navParams.data.payload.parentAcctType === 'CREDITCARD'){
    
    //   })
    // }
  }
  returnToAccounts(){
    this.navCtrl.push(AccountsPage, {}, {animate: true, direction: 'back'})
  }
}
