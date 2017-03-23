import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AngularFire } from 'angularfire2';
/*
  Generated class for the Note page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
class Note {
  title: string
  body: string
  id: string

  constructor() {}
}

@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
})
export class NotePage {
  note: Note = new Note()
  constructor(public navCtrl: NavController, public af: AngularFire) {}

  submit() {
    this.af.database.list('/notes').push(this.note)
    this.note = new Note()
    this.navCtrl.parent.select(0)
  }

}
