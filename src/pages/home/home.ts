import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes: FirebaseListObservable<any>
  constructor(public navCtrl: NavController, public af: AngularFire,
    public alertCtrl: AlertController, 
    public actionSheetCtrl: ActionSheetController
  ) {
    this.notes = af.database.list('/notes')


  }

   showOptions(itemId, value){
    let actionSheet = this.actionSheetCtrl.create(
      {
        title:"What do you want to do?",
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

  updateItem(item, v){
    console.log(item, v);
    let prompt = this.alertCtrl.create({
      title:"Update value",
      message:"Update value for the item",
      inputs:[
        {
          name:'value',
          placeholder:"new value",
          value:v
        }
      ],
      buttons:[
        {
          text:'Cancel',
          handler:data=>{
            console.log("Cancel update");
          }
        },{
          text:'Save',
          handler:data=>{
            console.log(data);
            this.notes.update(item, data);
          }
        }
      ]
    });
    prompt.present();
  }
}
