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

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './configs/firebase';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

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
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    NativeStorage,
    HTTP,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
