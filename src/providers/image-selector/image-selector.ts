import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the ImageSelectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageSelectorProvider {

   public cameraImage : String

   constructor(
               private _CAMERA : Camera)
   {
   }


   selectImage() : Promise<any>
   {
      return new Promise(resolve =>
      {
         let cameraOptions : CameraOptions = {
             sourceType         : this._CAMERA.PictureSourceType.PHOTOLIBRARY,
             destinationType    : this._CAMERA.DestinationType.DATA_URL,
             quality            : 60,
             encodingType       : this._CAMERA.EncodingType.JPEG,
             correctOrientation : true
         };

         this._CAMERA.getPicture(cameraOptions)
         .then((data) =>
         {
            this.cameraImage 	= "data:image/jpeg;base64," + data;
            resolve(this.cameraImage);
         });


      });
   }

}