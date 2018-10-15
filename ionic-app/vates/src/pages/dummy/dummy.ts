import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';


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

  cabs: any;
  buses: any;
  trains: any;
  //Set the properties in this class
  long: any; //longitude
  lati: any; //latitude
  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DummyPage');
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

        this.cabs = [
          response_data[0].car_no + "   " + response_data[0].driver_name + "   " + response_data[0].rating + "   " + response_mode_data[0].model,
          response_data[1].car_no + "   " + response_data[1].driver_name + "   " + response_data[1].rating + "   " + response_mode_data[1].model,
          response_data[2].car_no + "   " + response_data[2].driver_name + "   " + response_data[2].rating + "   " + response_mode_data[2].model,
          response_data[3].car_no + "   " + response_data[3].driver_name + "   " + response_data[3].rating + "   " + response_mode_data[3].model,
          response_data[4].car_no + "   " + response_data[4].driver_name + "   " + response_data[4].rating + "   " + response_mode_data[4].model
        ]
        // this.buses = [
        //   'A2 Amma Bus'
        // ]
        // this.trains = [
        //   '600012 Palakkad-Chennai Express'
        // ]



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
    alert(JSON.stringify(item));

  }

}
