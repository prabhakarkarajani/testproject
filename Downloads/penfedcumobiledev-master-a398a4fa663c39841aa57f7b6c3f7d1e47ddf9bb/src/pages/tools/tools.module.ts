import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToolsPage } from './tools';

@NgModule({
  declarations: [
    ToolsPage,
  ],
  imports: [
    IonicPageModule.forChild(ToolsPage),
  ],
  exports: [
    ToolsPage
  ]
})
export class ToolsPageModule {}
