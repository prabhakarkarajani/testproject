import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnderConstructionPage } from './under-construction';

@NgModule({
  declarations: [
    UnderConstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(UnderConstructionPage),
  ],
  exports: [
    UnderConstructionPage
  ]
})
export class UnderConstructionPageModule {}
