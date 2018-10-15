import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { HTTP } from '@ionic-native/http';


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private tts: TextToSpeech, private speechRecognition: SpeechRecognition, private http: HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.tts.speak('Welcome to VATES, A Voice-based Automated Transport Enquiry System').then(() => console.log('Success'));

    // this.http.get('http://192.168.43.149:8000/sample', {}, {})
    //   .then(data => {
    //     console.log('GKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK:')
    //     console.log(data.status);
    //     console.log(data.data); // data received by server
    //     console.log(data.headers);
    //
    //   })
    //   .catch(error => {
    //
    //     console.log(error.status);
    //     console.log(error.error); // error message as string
    //     console.log(error.headers);
    //
    //   });
  }

  listenNow() {

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
          if (matches.indexOf("show Cabs") > -1) {
            console.log('Navigator Page Incoming');
            this.navCtrl.push('DummyPage');
          }
          else if (matches.indexOf("show my profile") > -1) {
            console.log('Profile Page Incoming');
            this.navCtrl.push('ProfilePage');
          }
          else {
            this.tts.speak('Sorry I didn\'t understand you. Please try again.').then(() => console.log('Success'));
            alert("COMMAND NOT FOUND. Please retry.");
          }
          console.log(matches);
        },
        (onerror) => console.log('error:', onerror)
      )


  }


  logout() {
    this.http.get('http://192.168.43.149:8000/logout', {}, {})
      .then(data => {
        console.log('GKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK:')
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        let response = JSON.parse(data.data);
        if (data.status = 201) {
          if (response.data == "I dont give a shit") {
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
