import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';


import { MyApp } from './app.component';

import { LoginPageModule } from '../pages/login/login.module';
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { DummyPageModule } from '../pages/dummy/dummy.module';
import { ReportPageModule } from '../pages/report/report.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { NavigatorPageModule } from '../pages/navigator/navigator.module';
import { PswdresetPageModule } from '../pages/pswdreset/pswdreset.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    WelcomePageModule,
    SignupPageModule,
    DummyPageModule,
    ReportPageModule,
    ProfilePageModule,
    NavigatorPageModule,
    PswdresetPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TextToSpeech,
    SpeechRecognition,
    HTTP,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
