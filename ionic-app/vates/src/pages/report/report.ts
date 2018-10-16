import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private http: HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
    this.getReport();
  }

  getReport() {
    this.http.get('http://192.168.43.149:8000/report/', {}, {})
      .then(data => {
        console.log('GKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK:')
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        let response = JSON.parse(data.data);
        if (data.status = 201) {
          alert(JSON.stringify(response));
        }
        else {
          alert("DATA FETCH FAILURE");
        }
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }

}
