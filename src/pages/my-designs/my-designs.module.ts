import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDesignsPage } from './my-designs';

@NgModule({
  declarations: [
    MyDesignsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDesignsPage),
  ],
})
export class MyDesignsPageModule {}
