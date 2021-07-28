import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Socket } from 'ngx-socket-io';
import { DataService } from './services/data.service';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { config } from './configs/config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private socket: Socket,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private data: DataService,
    private oneSignal: OneSignal
  ) {
    this.initializeApp();
  }

  isCordovaAvailable(){
    if (!(<any>window).cordova) {
      console.log('This is a native feature. Please use a device');
      return false;
    }
    return true;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#000000');
      if (this.isCordovaAvailable()){
        if (this.platform.is('android')) {
          this.oneSignal.startInit(config.oneSignalAppId, config.oneSignal_sender_id);
        }else if (this.platform.is('ios')) {
          this.oneSignal.startInit(config.oneSignalAppId);
        }
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => {console.log(data); this.onPushReceived(data.payload)});
        this.oneSignal.handleNotificationOpened().subscribe(data => {console.log(data); this.onPushOpened(data.notification.payload)});
        this.oneSignal.endInit();
        this.oneSignal.getIds().then(identity => {
          /*this.data.getStorage('USER').then((user)=>{
            if(user[0] && user[0].ONE_SIGNAL_ID !== identity.userId){
              let vals = {uid: user[0].UID, oneSignal: identity.userId};
              this.data.requestPost(vals, 'onesignal');  
            }
          });      */    
        });
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.socket.connect();
      this.socket.fromEvent('pontos-add').subscribe((pontos: any) =>{
        this.data.getStorage('USER').then((user: any) =>{
          if(user[0].UID == pontos.user){
            let update = user;
            update[0].PONTOS = parseInt(update[0].PONTOS) + pontos.pontos;

            this.data.setStorage('USER', update);
          }
        });
      });
    });
  }

  private onPushReceived(payload: OSNotificationPayload) {
    //console.log('recebi');
    //alert('Push recevied:' + payload.body);
  }

  private onPushOpened(payload: OSNotificationPayload) {
    
    //alert('Push opened: ' + payload.body);
  }
}
