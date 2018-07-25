import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = '';
    this.password = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  authenticate() {
    console.log('Entered authenticate');
    console.log('USERNAME: ' + this.username + ', PASSWORD: ' + this.password)
    if (this.username == "admin" && this.password == "admin") {
      console.log('SUCCESS');
      this.navCtrl.setRoot('WelcomePage');
    }
  }

  newSignup() {
    console.log('New SignUp');
    this.navCtrl.setRoot('SignupPage');
  }

}
