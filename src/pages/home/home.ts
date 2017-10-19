import { Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postList

  constructor( private db: AngularFireDatabase, private iab: InAppBrowser) {
    this.db.list('blogTailors').subscribe((res)=>{
    	this.postList = res;
    })
  }


  more(post){
    this.iab.create(post.link, '_blank');
  }

}
