import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { NotePage } from "../notes/note";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  notes: FirebaseListObservable<any>

  constructor(public navCtrl: NavController, public af: AngularFire,
    public alertCtrl: AlertController, 
    public actionSheetCtrl: ActionSheetController) {
    this.notes = af.database.list('/notes')
  }

   showOptions(itemId, value){
    let actionSheet = this.actionSheetCtrl.create(
      {
        title:"Options:",
        buttons:[
          {
            text:"Delete",
            role:"destructive",
            handler:()=>{
              this.removeItem(itemId);
            }
          },
          {
            text:"Update",
            handler:()=>{
              this.updateItem(itemId, value);
            }
          },
          {
            text:"Cancel",
            role: "cancel",
            handler:()=>{
              console.log("Cancel");
            }
          }
        ]
      }
    );
    actionSheet.present();
  }

  removeItem(itemId: string){
    console.log(itemId);
    this.notes.remove(itemId);
  }

  updateItem(itemId, v){
      this.navCtrl.push(NotePage, {
        param1: itemId
    });
  };
}
