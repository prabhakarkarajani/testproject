import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
// import { AccountsPage } from "../accounts";

@Component({
  selector:"account-header-actions",
  templateUrl:"account-header-actions.html"
})
export class AccountHeaderActionsComponent{
public actionsParams:any;
  constructor(private navParams:NavParams){
    this.actionsParams = this.navParams.data;
  }
}
