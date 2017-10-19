import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanceledOrderPage } from './canceled-order';

@NgModule({
  declarations: [
    CanceledOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CanceledOrderPage),
  ],
})
export class CanceledOrderPageModule {}
