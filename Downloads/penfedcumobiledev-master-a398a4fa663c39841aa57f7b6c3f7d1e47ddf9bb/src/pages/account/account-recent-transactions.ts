import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { SharedMortgageDataProvider } from "../../providers/shared-mortgage-data/shared-mortgage-data";
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";

@Component({
  selector:"account-recent-transactions",
  templateUrl:"account-recent-transactions.html"
})

export class AccountRecentTransactionsComponent{
  public accountDetails:any;
  public recentTransactions:any;
  public loanTransactions:any;
  public mortgageDetails:any;
  
  constructor(public navParams: NavParams, private api:AccountsServiceProvider, private sharedMortgageData: SharedMortgageDataProvider){
    console.log('Header Params from NavParams', navParams);
    this.accountDetails = this.navParams.data.payload;
    
  }
  ngOnInit(){
    console.log(this.accountDetails.accountMask);
    this.api.getRecentTransactions(this.accountDetails.accountMask).subscribe(res=>{
      let resultJson:any = res;
      if (this.navParams.data.payload.parentAcctType === 'MORTGAGE'){
        this.sharedMortgageData.shareMortgageData(JSON.parse(resultJson._body));
        this.recentTransactions = JSON.parse(resultJson._body).transactions;
      } else {
        this.recentTransactions = JSON.parse(resultJson._body).transactions;
      }
    })
  }
}