import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { OrderPage } from '../order/order';
/**
 * Generated class for the PendingOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-order',
  templateUrl: 'pending-order.html',
})
export class PendingOrderPage {


	authObserver;
	uid;
	tailor;
	cloths;
	isCloth;


	  constructor(public afAuth: AngularFireAuth, private nC: NavController, private http: HTTP, public db: AngularFireDatabase) { }

	  ngOnInit() {

	      this.authObserver = this.afAuth.authState.subscribe( user => {
	        if (user) {
	          this.uid = user.uid;
	            this.db.object('tailors/'+user.uid)
	              .subscribe(res => {
	                this.tailor = res;
	                if(this.tailor.orders){
	                	this.cloths = this.getCloths(this.tailor.orders)
	                	this.isCloth = true;
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
	  	this.nC.push(OrderPage, {order: cloth})
	  }

	  accept(order){
	    if(order.accepted === true){

	        }else{
	          this.db.object('/users/'+order.user+'/orders/'+ order.userOrderKey).update({status: 'In Progress', accepted: true});
	          this.db.object('/tailors/' + order.labelId +'/orders/' + order.tailorOrderKey).update({status: 'In Progress', accepted: true});
	          this.db.object('/orders/'+ order.ordersKey).update({status: 'In Progress', accepted: true});
	        }
	  }

	  decline(order){
	    if(order.accepted === false){

	          }else{
	          //this.db.object('/users/'+order.user+'/orders/'+ order.userOrderKey).update({status: 'Declined', accepted: false});
	            this.db.object('/tailors/' + order.labelId +'/orders/' + order.tailorOrderKey).update({status: 'Declined', accepted: false});
	            this.db.object('/orders/'+ order.ordersKey).update({status: 'Declined', accepted: false});
	            this.http.post('https://ladrope.com/decline', order, {})
	         }
	    }
	    
}