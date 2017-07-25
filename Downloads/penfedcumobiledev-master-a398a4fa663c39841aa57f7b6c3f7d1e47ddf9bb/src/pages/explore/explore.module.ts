import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplorePage } from './explore';
import { CategoryPipe} from '../../pipes/category';


@NgModule({
  declarations: [
    ExplorePage,CategoryPipe
  ],
  imports: [
    IonicPageModule.forChild(ExplorePage),
  ],
  exports: [
    ExplorePage
  ]
})
export class ExplorePageModule {}
