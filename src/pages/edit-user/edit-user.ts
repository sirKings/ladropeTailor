import { Component } from '@angular/core';
import { IonicPage, 
         NavController,
         NavParams,
         AlertController,
         } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';



@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {
  uid;
  user;
  height;
  userForm:FormGroup;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public formBuilder: FormBuilder, private authData: AuthProvider) {
    this.user = navParams.get('user');
    this.uid = navParams.get('uid');


    this.userForm = formBuilder.group({
        phone: ['', Validators.compose([Validators.required])],
        address:['', Validators.compose([Validators.required])],
        name:  ['', Validators.compose([Validators.required])],
        account: ['', Validators.compose([Validators.required])],
        accountName: ['', Validators.compose([Validators.required])],
        bank: ['', Validators.compose([Validators.required])]

    })

    
    if(this.user.phone){
    	this.userForm.get("phone").setValue(this.user.phone);
    }
    if(this.user.address){
    	this.userForm.get("address").setValue(this.user.address);
    }
    if(this.user.name){
    	this.userForm.get("name").setValue(this.user.name);
    }
    if(this.user.account){
    	this.userForm.get("account").setValue(this.user.account);
    }
    if(this.user.accountName){
    	this.userForm.get("accountName").setValue(this.user.accountName);
    }
    if(this.user.bank){
    	this.userForm.get("bank").setValue(this.user.bank);
    }
    
    
  }

  saveUser(){
      if(!this.userForm.valid){
        let alert = this.alertCtrl.create({
                message: 'Enter all details',
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
            alert.present();
      }else {
        
        this.authData.updateUser(this.uid, this.user.displayName, this.userForm.value.bank, this.userForm.value.account, this.userForm.value.address, this.userForm.value.phone, this.userForm.value.accountName, this.userForm.value.name, this.user.email);
        this.navCtrl.pop()
      }
      
  }

  cancel(){
      this.navCtrl.pop()
  }

}
