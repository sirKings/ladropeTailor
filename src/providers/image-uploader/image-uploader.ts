import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the ImageUploaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageUploaderProvider {


  constructor() {
    
    
    }
    uploadImage(imageString, uid) : Promise<any> {
       let image       : string  = new Date().getTime() + '.jpg',
           storageRef  : any,
           parseUpload : any;
        
       return new Promise((resolve, reject) => 
       {
          storageRef       = firebase.storage().ref('tailors/'+uid+'/cloth/' + image);    
          parseUpload      = storageRef.putString(imageString, 'data_url');
      
          parseUpload.on('state_changed', (_snapshot) => 
          {
             // We could log the progress here IF necessary
             //console.log('snapshot progess ' + _snapshot);
          }, 
          (_err) => 
          {
             reject(_err);
          }, 
          (success) => 
          {
             resolve(parseUpload.snapshot);
          });
       });

  	}

}


