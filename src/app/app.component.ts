import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed, 
  Modals
  } from '@capacitor/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
  const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  tokenNot : string;
  constructor(private router : Router, private platform: Platform,private splashScreen: SplashScreen,private statusBar: StatusBar, public alertController : AlertController,private auth  :AuthenticationService) 
  
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.auth.authenticationState.subscribe(state=>{
        console.log("app" + state);

        if(state){
            this.router.navigate(['home']);
        }
          else
          {
            this.router.navigate(['login'])
          }
        }
      )
    });
  }


  ngOnInit() 
  {
    this.auth.checkTokens();
    // console.log('Initializing HomePage');

    // PushNotifications.register();
    // PushNotifications.addListener('registration', 
    //   (token: PushNotificationToken) => {
    //     alert('Push registration success, token: ' + token.value);
    //     this.tokenNot = token.value;
    //   }
    // );

    // PushNotifications.addListener('registrationError', 
    //   (error: any) => {
    //     alert('Error on registration: ' + JSON.stringify(error));
    //   }
    // );

    // PushNotifications.addListener('pushNotificationReceived', 
    //    (notification: PushNotification) => {
    //    alert('Push received: ' + JSON.stringify(notification));
    //     let n =  Modals.alert({
    //       title : "notification.title",
    //       message : notification.body 
                   
    //     });
    //     this.presentAlert(notification.body,notification.title);
      
    //   }
    // );

    // PushNotifications.addListener('pushNotificationActionPerformed', 
    //   (notification: PushNotificationActionPerformed) => {
    //     alert('Push action performed: ' + JSON.stringify(notification));
    //   }
    // );
    
}

async presentAlert(body : string, title : string ) {
  const alert = await this.alertController.create({
    header: 'Shkolla Manager',
    subHeader: title,
    message: body,
    buttons: ['OK']
  });

  await alert.present();
  }



  
}
