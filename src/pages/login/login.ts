
import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth'

import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup'

import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  loginForm:FormGroup;
  loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), 
      Validators.required])]
    });
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
      let alert = this.alertCtrl.create({
              message: 'Enter Signin details',
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.loading.dismissAll()
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }


  signInWithGoogle() {
    this.authData.signinGoogle()
     .then(res => { 
      this.navCtrl.setRoot(HomePage);
      }, error => {
        var errorMessage: string = error.message;
        let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
        alert.present();
      });
  }



  goToResetPassword(){
  this.navCtrl.push(ResetPasswordPage);
  }

  createAccount(){
  this.navCtrl.push(SignupPage);
  }

}
