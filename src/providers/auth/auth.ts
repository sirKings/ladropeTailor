import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthProvider {
  
  userDb;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
      
  }

  loginUser(newEmail: string, newPassword: string){
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }
  
  signinGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // writeUserData(uid, displayName, email, imageUrl, address, phone){
  //     this.db.list(`users/${uid}`)
  //    	.subscribe(data => {
  //       if(data.val() === null) {
  //          console.log('User does not exist');
  //          this.userDb = this.db.object('/users/'+ uid); 
  //             this.userDb.set({
  //             displayName: displayName,
  //             email: email,
  //             photoURL: imageUrl,
  //             address: address,
  //             phone: phone,
  //          })
  //           return;
  //       } else {
  //         console.log('User does exist');
  //       }
  //     });
  //  }

   updateUser(uid, displayName, bank, account, address, phone, acccountName, name, email){
       this.userDb = this.db.object('/tailors/'+ uid);
       this.userDb.update({
              displayName: displayName,
              email: email,
              bank: bank,
              address: address,
              phone: phone,
              account: account,
              accountName: acccountName,
              name: name,

           })
   }

}