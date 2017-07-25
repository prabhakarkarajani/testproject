import { Injectable } from '@angular/core';


export class SessionManager {
  public isLoggedIn: boolean = false;
  public accountsList:any;
  public IRAAccounts:any;
  public sessionID:string = null;

 private static _instance: SessionManager = null;
 static singletonInstance() {
        if (this._instance === null) {
            this._instance = new SessionManager();
        }
        return this._instance;
    }
   constructor(){
  /* this.accountsList =[];
   this.sessionID = null;
   this.IRAAccounts = [];
   */
    }

}