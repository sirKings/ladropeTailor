import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CompletedOrderPage } from '../pages/completed-order/completed-order';
import { CanceledOrderPage } from '../pages/canceled-order/canceled-order';
import { SettingsPage } from '../pages/settings/settings';
import { MyDesignsPage } from '../pages/my-designs/my-designs';
import { PendingOrderPage } from '../pages/pending-order/pending-order';

import { LandingPage } from '../pages/landing/landing';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private afAuth: AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;

        authObserver.unsubscribe();
      } else {
        this.rootPage = LandingPage;
        authObserver.unsubscribe();
      }
      });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'News', component: HomePage },
      { title: 'My designs', component: MyDesignsPage},
      { title: 'Post Design', component: ListPage },
      { title: 'Completed Orders', component: CompletedOrderPage},
      //{ title: 'Canceled Orders', component: CanceledOrderPage},
      { title: 'Pending Orders', component: PendingOrderPage},
      { title: 'Settings', component: SettingsPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
