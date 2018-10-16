import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.username = '';
    this.password = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  authenticate() {
    console.log('Entered authenticate');
    console.log('USERNAME: ' + this.username + ', PASSWORD: ' + this.password)
    // if (this.username == "admin" && this.password == "admin") {
    //   console.log('SUCCESS');
    //   this.navCtrl.setRoot('WelcomePage');}

    let postData = {
      "username": this.username,
      "password": this.password
    }

    console.log(JSON.stringify(postData));
    this.http.setDataSerializer("JSON");
    this.http.post('http://192.168.43.149:8000/login/', postData, {}).then(data => {
      // console.log(data.status);
      // console.log(data.data); // data received by server
      // console.log(data.headers);
      console.log(data);
      if (data.status == 201) {
        let response = JSON.parse(data.data);
        if (response.login == 'true') {
          console.log('Login Success');
          if (postData.username == 'admin') {
            console.log('ADMIN:');
            this.navCtrl.push('ReportPage');
          }
          else {
            console.log('CUSTOMER:');
            this.navCtrl.push('WelcomePage');
          }
        }
        else {
          alert("Login Failure");
        }
      }
    })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }

  newSignup() {
    console.log('New SignUp');
    this.navCtrl.push('SignupPage');
  }

}
