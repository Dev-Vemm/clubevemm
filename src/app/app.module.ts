import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DetalhesPontosComponent } from './components/detalhes-pontos/detalhes-pontos.component';
import { DetalhesCuponsComponent } from './components/detalhes-cupons/detalhes-cupons.component';
import { DetalhesOfertasComponent } from './components/detalhes-ofertas/detalhes-ofertas.component';
import { DetalhesPlanosComponent } from './components/detalhes-planos/detalhes-planos.component';

import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './configs/firebase';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//import { Facebook } from '@ionic-native/facebook/ngx';

const config: SocketIoConfig = { url: 'https://ultravantagens-teste.herokuapp.com/', options: {}};

@NgModule({
  declarations: [
    AppComponent, 
    DetalhesPontosComponent, 
    DetalhesCuponsComponent, 
    DetalhesPlanosComponent, 
    DetalhesOfertasComponent
  ],
  entryComponents: [
    DetalhesPontosComponent, 
    DetalhesCuponsComponent, 
    DetalhesPlanosComponent, 
    DetalhesOfertasComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    OneSignal,
    //Facebook,
    NativeStorage,
    HTTP,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
