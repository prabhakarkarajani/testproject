import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { AccountPage } from "../account/account";


/**
 * Generated class for the AccountListItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'account-list-item',
  templateUrl: 'account-list-item.html'
})
export class AccountListItemComponent {
  @Input()
  public accountType:any;
  @Input()
  public accountTypeLabel:string;
  @Input()
  public accountAsOfDate:string;

  constructor(private navCtrl:NavController) { 

  }

  loadAccount(accountDetails){
    this.navCtrl.push(AccountPage,{
      pageType:'ACCOUNT_PAGE',
      payload: accountDetails
    })
  }

}
