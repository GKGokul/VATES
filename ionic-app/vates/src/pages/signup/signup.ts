import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private userData: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.userData = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(10)])],
      phone_no: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAILPATTERN)])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  logForm() {

    console.log(JSON.stringify(this.userData.value));
  }

  submitDetails() {
    let data = this.userData.value;
    console.log('GKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK:');
    data.privilege = 0;
    console.log(JSON.stringify(data));
    this.http.setDataSerializer("JSON");
    this.http.post('http://192.168.43.149:8000/register/', data, {})
      .then(data => {
        console.log('GKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK:')
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        let response = JSON.parse(data.data);
        if (data.status = 201) {
          if (response.data == "success") {
            this.navCtrl.pop();
          }
        }

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

}
