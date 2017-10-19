import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';

import { ImageSelectorProvider } from '../../providers/image-selector/image-selector';
import { ImageUploaderProvider } from '../../providers/image-uploader/image-uploader';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  postDesign: FormGroup;
  uid;
  tailor;
  post = [];

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, private is: ImageSelectorProvider, private iu: ImageUploaderProvider, public navCtrl: NavController, public afAuth: AngularFireAuth, private db: AngularFireDatabase, public navParams: NavParams, private fB: FormBuilder) {
    let authObserver = afAuth.authState.subscribe(user => {
      if(user) {
        this.uid = user.uid;
          this.db.object('tailors/'+user.uid)
            .subscribe(res => {
              this.tailor = res;
            })
      }
      authObserver.unsubscribe()
    })

    this.postDesign = fB.group({
      name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      gender:  ['', Validators.compose([Validators.required])],
      tags:  ['', Validators.compose([Validators.required])],
      time:  ['', Validators.compose([Validators.required])],
      description:  ['', Validators.compose([Validators.required])],
      fabricType:  ['', Validators.compose([Validators.required])]
    })
   }

   addImage(){
     this.is.selectImage().then((res)=>{
       let loader = this.loadingCtrl.create({
             content: "Uploading Image...",
           });
           loader.present();
       this.iu.uploadImage(res, this.uid).then((res)=>{
         this.post.push(res.downloadURL)
         console.log(res)
         loader.dismiss()
       }).catch((err)=>{
         console.log(err)
       })
     }).catch((error)=>{
       console.log(error)
     })
   }

   submit(){
     if(this.postDesign.valid){
       if(this.post.length === 4){
         let clothKey = this.db.list('/cloths/' + this.postDesign.value.gender)
         .push({
           image1: this.post[0],
           image2: this.post[1],
           image3: this.post[2],
           image4: this.post[3],
           name: this.postDesign.value.name,
           cost: this.postDesign.value.price,
           price: this.getSellingPrice(this.postDesign.value.price),
           time: this.postDesign.value.time,
           gender: this.postDesign.value.gender,
           tags: this.postDesign.value.tags,
           description: this.postDesign.value.description,
           likers: {
                 hello: true
               },
           fabricType: this.postDesign.value.fabricType,
           rating: 0,
           numComment: 0,
           likes: 0,
           label: this.tailor.name,
           labelId: this.tailor.uid,
           labelEmail: this.tailor.email,
           labelPhone: this.tailor.phone,
           numSold: 0,
           date: firebase.database.ServerValue.TIMESTAMP
         }).key

         let tailorkey = this.db.list('/tailors/'+ this.tailor.uid+ '/cloths')
         .push({
           image1: this.post[0],
           image2: this.post[1],
           image3: this.post[2],
           image4: this.post[3],
           name: this.postDesign.value.name,
           cost: this.postDesign.value.price,
           price: this.getSellingPrice(this.postDesign.value.price),
           time: this.postDesign.value.time,
           gender: this.postDesign.value.gender,
           labelPhone: this.tailor.phone,
           tags: this.postDesign.value.tags,
           fabricType: this.postDesign.value.fabricType,
           description: this.postDesign.value.description,
           likers: {
                 hello: true
               },
           rating: 0,
           numComment: 0,
           likes: 0,
           label: this.tailor.name,
           labelId: this.tailor.uid,
           labelEmail: this.tailor.email,
           numSold: 0,
           date: firebase.database.ServerValue.TIMESTAMP,
         }).key

         let timestamp = 0
         let date =this.db.object('/cloths/'+ this.postDesign.value.gender + '/' + clothKey+ '/date')
             .subscribe(snapshot =>{
               timestamp = snapshot.$value;
               timestamp = timestamp * -1
             })
         date.unsubscribe();
         
         this.db.object('/cloths/'+ this.postDesign.value.gender + '/' + clothKey).update({clothKey: clothKey, tailorKey: tailorkey, date: timestamp});
         this.db.object('/tailors/'+ this.tailor.uid+ '/cloths/' + tailorkey).update({clothKey: clothKey, tailorKey: tailorkey, date: timestamp});
           
         
           
         this.postDesign.reset();
          let alert = this.alertCtrl.create({
             message: "Your design has been posted!",
             buttons: [
               {
                 text: "Ok",
                 role: 'cancel',
               }
             ]
           });
           alert.present();
       }else{
         let alert = this.alertCtrl.create({
          message: "Please add upto for images",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
            }
          ]
        });
        alert.present();
       }
     }else{
       let alert = this.alertCtrl.create({
          message: "Please enter all details",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
            }
          ]
        });
        alert.present();
     }
   }


   getSellingPrice(nume){
     let num = +nume
     let sellingPrice = 0;
     let percentage = 0.15* num;

      if(percentage < 1500){
       sellingPrice = num + 1500;
     }else{
       sellingPrice = num + percentage;
     }
     return Math.ceil(sellingPrice/100)*100;
   }
}










