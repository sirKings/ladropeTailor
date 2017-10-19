import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HTTP } from '@ionic-native/http';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MyDesignsPage } from '../pages/my-designs/my-designs';
import { SettingsPage } from '../pages/settings/settings';
import { CanceledOrderPage } from '../pages/canceled-order/canceled-order';
import { CompletedOrderPage } from '../pages/completed-order/completed-order';
import { PendingOrderPage } from '../pages/pending-order/pending-order';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { EditUserPage } from '../pages/edit-user/edit-user';
import { EditDesignPage } from '../pages/edit-design/edit-design';
import { OrderPage } from '../pages/order/order';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { ImageUploaderProvider } from '../providers/image-uploader/image-uploader';
import { ImageSelectorProvider } from '../providers/image-selector/image-selector';

export const firebaseConfig = {

    apiKey: "AIzaSyDlN-RFjSBq4jBipkkyDYtF2AMuu8Kz1TY",
    authDomain: "ladrope-9e888.firebaseapp.com",
    databaseURL: "https://ladrope-9e888.firebaseio.com",
    projectId: "ladrope-9e888",
    storageBucket: "ladrope-9e888.appspot.com",
    messagingSenderId: "205152875857"

}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage/*,
    CanceledOrderPage,
    CompletedOrderPage,
    PendingOrderPage,
    SettingsPage,
    MyDesignsPage,
    LandingPage,
    SignupPage,
    LoginPage,
    ResetPasswordPage,
    EditUserPage,
    EditDesignPage,
    OrderPage*/
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CanceledOrderPage,
    CompletedOrderPage,
    SettingsPage,
    PendingOrderPage,
    MyDesignsPage,
    LandingPage,
    SignupPage,
    LoginPage,
    ResetPasswordPage,
    EditUserPage,
    EditDesignPage,
    OrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    InAppBrowser,
    HTTP,
    ImageUploaderProvider,
    ImageSelectorProvider,
    Camera
  ]
})
export class AppModule {}
