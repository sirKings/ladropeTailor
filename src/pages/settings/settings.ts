import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';

import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { SignupPage } from '../../pages/signup/signup';
import { EditUserPage } from '../../pages/edit-user/edit-user';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  userDetails: FirebaseObjectObservable<any>;
  uid;

  constructor(private authData: AuthProvider, public afAuth: AngularFireAuth, public navCtrl: NavController, private db: AngularFireDatabase) {
      
  }

  ngOnInit() {
      const authObserver = this.afAuth.authState.subscribe( user => {
          if (user) {
            this.uid = user.uid;
         
           this.db.object( '/tailors/' + this.uid )
            .subscribe( snapshot => {
                        this.userDetails = snapshot;
                        })

              authObserver.unsubscribe();
          } 
        });
    }
  
  signOut() {
    this.authData.logoutUser();
    this.navCtrl.setRoot(SignupPage);
  }

  editUser(){
     this.navCtrl.push(EditUserPage, {
          user: this.userDetails,
          uid: this.uid
      });
  }


}

