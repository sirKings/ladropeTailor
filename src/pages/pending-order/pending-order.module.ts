import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingOrderPage } from './pending-order';

@NgModule({
  declarations: [
    PendingOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingOrderPage),
  ],
})
export class PendingOrderPageModule {}
