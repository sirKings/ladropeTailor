import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompletedOrderPage } from './completed-order';

@NgModule({
  declarations: [
    CompletedOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CompletedOrderPage),
  ],
})
export class CompletedOrderPageModule {}
