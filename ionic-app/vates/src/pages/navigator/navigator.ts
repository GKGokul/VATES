import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

/**
 * Generated class for the NavigatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-navigator',
  templateUrl: 'navigator.html',
})
export class NavigatorPage {

  source: any;
  destination: any;
  fareEstimate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private tts: TextToSpeech, private speechRecognition: SpeechRecognition, private http: HTTP) {
    this.source = "";
    this.destination = "";
    this.fareEstimate = 0;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigatorPage');
  }

  listenSource() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          // Request permissions
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }
      })

    // Start the recognition process
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.source = matches[0];
          alert(this.source);
        },
        (onerror) => console.log('error:', onerror)
      )

  }

  listenDestination() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          // Request permissions
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }
      })

    // Start the recognition process
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.destination = matches[0];
          alert(this.destination);
        },
        (onerror) => console.log('error:', onerror)
      )

  }

  getFareEstimate() {
    if (this.source == "Coimbatore Railway Station" || this.destination == "Coimbatore Railway Station") {
      if (this.source == "Coimbatore Railway Station") {
        this.source = "cberailway";
      }
      else {
        this.destination = "cberailway";
      }
    }
    else if (this.source == "Gandhipuram bus stand" || this.destination == "Gandhipuram bus stand") {
      if (this.source == "Gandhipuram bus stand") {
        this.source = "gandhipuram_bs";
      }
      else {
        this.destination = "gandhipuram_bs";
      }
    }
    else if (this.source == "Brookefields Mall" || this.destination == "Brookefields Mall") {
      if (this.source == "Brookefields Mall") {
        this.source = "brookefields_mall";
      }
      else {
        this.destination = "brookefields_mall";
      }
    }
    else if (this.source == "Lakshmi Mills" || this.destination == "Lakshmi Mills") {
      if (this.source == "Lakshmi Mills") {
        this.source = "lakshmi_mills";
      }
      else {
        this.destination = "lakshmi_mills";
      }
    }
    else if (this.source == "v o c Park" || this.destination == "v o c Park") {
      if (this.source == "v o c Park") {
        this.source = "voc_park";
      }
      else {
        this.destination = "voc_park";
      }
    }
    else if (this.source == "Prozone mall" || this.destination == "Prozone mall") {
      if (this.source == "Prozone mall") {
        this.source = "prozone_mall";
      }
      else {
        this.destination = "prozone_mall";
      }
    }
    else if (this.source == "Omni bus stand" || this.destination == "Omni bus stand") {
      if (this.source == "Omni bus stand") {
        this.source = "omni_bus";
      }
      else {
        this.destination = "omni_bus";
      }
    }
    else if (this.source == "Ettimadai" || this.destination == "Ettimadai") {
      if (this.source == "Ettimadai") {
        this.source = "ettimadai";
      }
      else {
        this.destination = "ettimadai";
      }
    }

    alert("Source: " + this.source + "\n Destination: " + this.destination);

    let postData = {
      "from": this.source,
      "to": this.destination
    }

    console.log(JSON.stringify(postData));
    this.http.setDataSerializer("JSON");
    this.http.post('http://192.168.43.149:8000/places/', postData, {}).then(data => {
      // console.log(data.status);
      // console.log(data.data); // data received by server
      // console.log(data.headers);
      console.log(data);
      if (data.status == 201) {
        let response = JSON.parse(data.data);
        this.fareEstimate = response.fare;

        this.navCtrl.push('DummyPage', {
          "fareEstimate": this.fareEstimate
        });

      }
    })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });


  }



}
