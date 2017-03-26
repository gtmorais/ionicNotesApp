import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { SocialSharing } from '@ionic-native/social-sharing';
import { NotePage } from "../notes/note";
//import { Alert } from 'ionic/ionic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SocialSharing]
})

export class HomePage {
  notes: FirebaseListObservable<any>

  constructor(public navCtrl: NavController, public af: AngularFire,
    public alertCtrl: AlertController, 
    public actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing) {
    this.notes = af.database.list('/notes')
  }

   showOptions(itemId, value){
    let actionSheet = this.actionSheetCtrl.create(
      {
        title:"Options:",
        buttons:[
          {
            text:"Delete",
            icon:"ios-trash",
            role:"destructive",
            handler:()=>{
              this.removeItem(itemId);
            }
          },
          {
            text:"Update",
            icon:"ios-redo",
            handler:()=>{
              this.updateItem(itemId, value);
            }
          },
          {
            text:"Share",
            icon:"ios-share",
            handler:()=>{
              this.shareItem(itemId, value);
            }
          },
          {
            text:"Cancel",
            icon:"ios-close",
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
      this.navCtrl.push(NotePage, {
        param1: item
    });
  };

   shareItem(item, v){
          //Check if sharing via email is supported
          this.socialSharing.canShareViaEmail().then(() => {
            this.socialSharing.shareViaEmail(item.body, v, ['gtmorais@gmail.com']).then(() => {
          // Success!
        }).catch(() => {
          alert("It was not possible to send email.");
        });
      }).catch(() => {
        // Sharing via email is not possible
        alert("It was not possible to share.");
      });
  };
}
