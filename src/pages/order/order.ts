import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

order;
unit;
isOption;
options

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	  this.order = this.navParams.get('order')
  	  this.unit = this.order.size.unit;
  	  if(this.order.options === 'No options'){
  	    this.isOption = false;
  	  }else{
  	    this.isOption = true;
  	    this.options = this.order.options
  	    console.log(this.options)
  	  }
  }

  

}
