import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.userData = {
      id: "",
      username: "",
      email: "",
      first_name: "",
      lastName: "",
      phone_no: ""
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getProfileData();
  }

  getProfileData() {
    this.http.get('http://192.168.43.149:8000/profile/', {}, {})
      .then(data => {
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        let response = JSON.parse(data.data);
        this.userData.id = response.user_data.id;
        this.userData.username = response.user_data.username;
        this.userData.email = response.user_data.email;
        this.userData.first_name = response.user_data.first_name;
        this.userData.last_name = response.user_data.last_name;
        this.userData.phone_no = response.app_user_data.phone_no;
        this.userData.priv = response.app_user_data.priv;

        // console.log('GKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK');
        // console.log(JSON.stringify(response_data));

      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }

  editDetails() {

    let postData = {
      "username": this.userData.username,
      "first_name": this.userData.first_name,
      "last_name": this.userData.last_name,
      "email": this.userData.email,
      "phone_no": this.userData.phone_no,
      "priv": this.userData.priv
    }

    console.log(JSON.stringify(postData));
    this.http.setDataSerializer("JSON");
    this.http.post('http://192.168.43.149:8000/profile/', postData, {}).then(data => {
      // console.log(data.status);
      // console.log(data.data); // data received by server
      // console.log(data.headers);
      console.log(data);
      if (data.status == 201) {
        alert("SUCCESS");
      }
    })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }


}
