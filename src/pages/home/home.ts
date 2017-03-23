import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes: FirebaseListObservable<any>
  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.notes = af.database.list('/notes')
  }

}
