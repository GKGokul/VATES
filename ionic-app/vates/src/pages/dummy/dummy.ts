import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { TextToSpeech } from '@ionic-native/text-to-speech';


/**
 * Generated class for the DummyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dummy',
  templateUrl: 'dummy.html',
})
export class DummyPage {

  response: any;

  cabs: any;
  buses: any;
  trains: any;
  //Set the properties in this class
  long: any; //longitude
  lati: any; //latitude
  fare: any;

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private tts: TextToSpeech) {
    this.cabs = [];
    let resp = this.navParams.get('fareEstimate');
    this.response = resp;
    this.fare = +this.response;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DummyPage');
    this.tts.speak(JSON.stringify(this.fare)).then(() => console.log('Success'));
    this.loadDetails();
  }

  loadDetails() {
    this.http.get('http://192.168.43.149:8000/', {}, {})
      .then(data => {
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        let response = JSON.parse(data.data);
        let response_data = response.data;
        let response_mode_data = response.mode_data;

        console.log('GKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK');
        console.log(JSON.stringify(response_data));
        console.log(JSON.stringify(response_mode_data));


        console.log(response_data[0].car_no, response_mode_data[0]);

        var num = 0;
        for (num = 0; num < 5; num++) {
          this.cabs.push([response_data[num], response_mode_data[num]]);
        }

        alert(JSON.stringify(this.cabs));

      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }


  public open(event, item) {
    event.stopPropagation();
    console.log('BOOOOOOKKKKK CLICKEDDDDDDDDDDDDDDDD');

    let alert = this.alertCtrl.create({
      title: 'Confirm Ride?',
      message: 'Are you sure to book this cab?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
          }
        }
      ]
    });
    alert.present();

    alert(JSON.stringify(item));
  }

  getEstimate() {
    this.tts.speak(JSON.stringify(this.fare)).then(() => console.log('Success'));
  }

}
