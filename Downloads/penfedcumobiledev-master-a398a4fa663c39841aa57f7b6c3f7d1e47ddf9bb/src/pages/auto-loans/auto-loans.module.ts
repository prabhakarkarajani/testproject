import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutoLoansPage } from './auto-loans';

@NgModule({
  declarations: [
    AutoLoansPage,
  ],
  imports: [
    IonicPageModule.forChild(AutoLoansPage),
  ],
  exports: [
    AutoLoansPage
  ]
})
export class AutoLoansPageModule {}
