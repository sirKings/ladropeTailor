import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { EditDesignPage } from '../edit-design/edit-design';
/**
 * Generated class for the MyDesignsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-designs',
  templateUrl: 'my-designs.html',
})
export class MyDesignsPage {

authObserver;
uid;
tailor;
cloths;
isCloth;


  constructor(public afAuth: AngularFireAuth, private navCtrl: NavController, public db: AngularFireDatabase) { }

  ngOnInit() {

      this.authObserver = this.afAuth.authState.subscribe( user => {
        if (user) {
          this.uid = user.uid;
            this.db.object('tailors/'+user.uid)
              .subscribe(res => {
                this.tailor = res;
                if(this.tailor.cloths){
                	this.cloths = this.getCloths(this.tailor.cloths)
                	this.isCloth = true;
                }else {
                	this.isCloth = false
                }
                
              })
          
        } 

      });

  }   

  ngOnDestroy() {
    this.authObserver.unsubscribe();
  }

  getCloths(obj){
      let result = Object.keys(obj).map(function(e) {
       return obj[e]
      });
      return result;
  }

  // onDelete(cloth){
  // 	this.db.object('/cloths/'+cloth.clothKey).set(null);
  // 	this.db.object('/tailors/'+this.tailor.uid+'/cloths/'+cloth.tailorKey).set(null);
  // }

  select(cloth){
  	//this.navCtrl.push([cloth.name], { relativeTo: this.route })
  }

  edit(cloth){
    this.navCtrl.push(EditDesignPage, {cloth: cloth, user: this.tailor})
  }

  deactivate(cloth){
    //console.log('deactivate')
    this.db.object('/cloths/'+cloth.gender+'/'+cloth.clothKey).set(null);

    this.db.object('/tailors/'+this.uid+'/cloths/'+cloth.tailorKey).update({deactive: true});
  }

  activate(cloth){
    if(cloth.deactive){
     let clothKey = this.db.list('/cloths/'+cloth.gender).push(cloth).key;
     this.db.object('/tailors/'+this.uid+'/cloths/'+cloth.tailorKey).update({clothKey: clothKey, deactive: null});
     this.db.object('/cloths/'+cloth.gender+'/'+clothKey).update({clothKey: clothKey, deactive: null}); 
   }else{

   }
    
  }

}