import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NotePage } from '../pages/notes/note';
import { Data } from '../providers/data';
import { AngularFireModule } from 'angularfire2'
import { ConnectionComponent } from '../components/connection/connection'
const config = {
    apiKey: "AIzaSyAyvKb-IlLxCwJq5hlQlf2ryT-koZKsT58",
    authDomain: "ionic2firebase-256cd.firebaseapp.com",
    databaseURL: "https://ionic2firebase-256cd.firebaseio.com",
    storageBucket: "ionic2firebase-256cd.appspot.com",
    messagingSenderId: "1076253064474"
  };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NotePage,
    ConnectionComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NotePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Data]
})
export class AppModule {}
