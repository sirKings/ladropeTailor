import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditDesignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-design',
  templateUrl: 'edit-design.html',
})
export class EditDesignPage {
cloth
postDesign: FormGroup;
tailor

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private db: AngularFireDatabase, private fB: FormBuilder, public navParams: NavParams) {
  	this.cloth = navParams.get('cloth')
  	this.tailor = navParams.get('user')

  	this.postDesign = fB.group({
      name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      tags:  ['', Validators.compose([Validators.required])],
      time:  ['', Validators.compose([Validators.required])],
      description:  ['', Validators.compose([Validators.required])],
      fabricType:  ['', Validators.compose([Validators.required])]
    })

    this.updateform()
  }

  updateform(){
  	this.postDesign.get("name").setValue(this.cloth.name);
  	this.postDesign.get("price").setValue(this.cloth.cost);
  	this.postDesign.get("tags").setValue(this.cloth.tags);
  	this.postDesign.get("time").setValue(this.cloth.time);
  	this.postDesign.get("fabricType").setValue(this.cloth.fabricType);
  	this.postDesign.get("description").setValue(this.cloth.description);
  }

  onSubmit(){
  	if(this.postDesign.valid){
  	  
  	   this.db.object('/cloths/' + this.cloth.gender +'/'+this.cloth.clothKey)
  	    .update({
			      name: this.postDesign.value.name,
  	      cost: this.postDesign.value.price,
  	      price: this.getSellingPrice(this.postDesign.value.price),
  	      time: this.postDesign.value.time,
  	      tags: this.postDesign.value.tags,
  	      description: this.postDesign.value.description,
  	      fabricType: this.postDesign.value.fabricType
  	    })

  	   this.db.object('/tailors/'+ this.tailor.uid+ '/cloths/'+this.cloth.tailorKey)
  	    .update({
  	      name: this.postDesign.value.name,
  	      cost: this.postDesign.value.price,
  	      price: this.getSellingPrice(this.postDesign.value.price),
  	      time: this.postDesign.value.time,
  	      tags: this.postDesign.value.tags,
  	      description: this.postDesign.value.description,
  	      fabricType: this.postDesign.value.fabricType
  	    })
  	    let alert = this.alertCtrl.create({
  	       message: "Your changes have been saved",
  	       buttons: [
  	         {
  	           text: "Ok",
  	           role: 'cancel',
  	         }
  	       ]
  	     });
  	     alert.present();
  	  }else {
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

 	getSellingPrice(num){
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
