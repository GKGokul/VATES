import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the PswdresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pswdreset',
  templateUrl: 'pswdreset.html',
})
export class PswdresetPage {

  oldPassword: any;
  password: any;
  newPassword: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PswdresetPage');
  }

  resetPswd() {
    let postData = {
      "old_password": this.oldPassword,
      "password": this.password
    }

    console.log(JSON.stringify(postData));
    this.http.setDataSerializer("JSON");
    this.http.post('http://192.168.43.149:8000/change/', postData, {}).then(data => {
      // console.log(data.status);
      // console.log(data.data); // data received by server
      // console.log(data.headers);
      console.log(data);
      if (data.status == 201) {
        alert("Password Changed Successfully");
      }
      else {
        alert("Please try again later");
      }
    })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }



}
