import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDesignPage } from './edit-design';

@NgModule({
  declarations: [
    EditDesignPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDesignPage),
  ],
})
export class EditDesignPageModule {}
