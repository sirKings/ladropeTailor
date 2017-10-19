import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the CompletedOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completed-order',
  templateUrl: 'completed-order.html',
})
export class CompletedOrderPage {

  
	authObserver;
	uid;
	tailor;
	cloths;
	isCloth;


	  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { }

	  ngOnInit() {

	      this.authObserver = this.afAuth.authState.subscribe( user => {
	        if (user) {
	          this.uid = user.uid;
	            this.db.object('tailors/'+user.uid)
	              .subscribe(res => {
	                this.tailor = res;
	                if(this.tailor.completedOrders){
	                	this.cloths = this.getCloths(this.tailor.completedOrders)
	                	this.isCloth = true;
	                }else{
	                	this.isCloth = false;
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


}
