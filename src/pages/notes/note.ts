import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  date: string
  constructor() {
    this.date = new Date().toDateString();
  }
}

@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
})
export class NotePage {
  note: Note = new Note()
  
  constructor(public navCtrl: NavController, private navParams: NavParams, public af: AngularFire) {
    var parameter1 = navParams.get('param1'); 
    if (parameter1 != null && parameter1 != "")
    {
      this.note = parameter1;
      this.note.id = parameter1.$key;
    }
  }

  submit() {
    if (this.note.id != undefined)
        this.af.database.list('/notes').update(this.note.id, this.note)
    else
      this.af.database.list('/notes').push(this.note)
    this.note = new Note()
    this.navCtrl.parent.select(0)
  }
}
