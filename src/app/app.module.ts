import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DetalhesPontosComponent } from './components/detalhes-pontos/detalhes-pontos.component';
import { DetalhesCuponsComponent } from './components/detalhes-cupons/detalhes-cupons.component';
import { DetalhesOfertasComponent } from './components/detalhes-ofertas/detalhes-ofertas.component';
import { DetalhesPlanosComponent } from './components/detalhes-planos/detalhes-planos.component';
import { DetalhesComentariosComponent } from './components/detalhes-comentarios/detalhes-comentarios.component';
import { OfertasSegmentosComponent } from './components/ofertas-segmentos/ofertas-segmentos.component';
import { OfertaCompraComponent } from './components/oferta-compra/oferta-compra.component';
import { OfertaDestaqueComponent } from './components/oferta-destaque/oferta-destaque.component';
import { OfertaCompraFinalComponent } from './components/oferta-compra-final/oferta-compra-final.component';
import { OfertaMapaComponent } from './components/oferta-mapa/oferta-mapa.component';
import { ShareEmailComponent } from './components/share-email/share-email.component';
import { ShareComponent } from './components/share/share.component';

import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './configs/firebase';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { IonicSelectableModule } from 'ionic-selectable';

//import { Facebook } from '@ionic-native/facebook/ngx';

const config: SocketIoConfig = { url: 'https://ultravantagens-teste.herokuapp.com/', options: {}};

@NgModule({
  declarations: [
    AppComponent, 
    DetalhesPontosComponent, 
    DetalhesCuponsComponent, 
    DetalhesPlanosComponent, 
    DetalhesOfertasComponent,
    DetalhesComentariosComponent,
    OfertaDestaqueComponent,
    OfertasSegmentosComponent,
    OfertaMapaComponent,
    OfertaCompraComponent,
    OfertaCompraFinalComponent,
    ShareComponent,
    ShareEmailComponent
  ],
  entryComponents: [
    DetalhesPontosComponent, 
    DetalhesCuponsComponent, 
    DetalhesPlanosComponent, 
    DetalhesOfertasComponent,
    OfertaDestaqueComponent,
    OfertaMapaComponent,
    DetalhesComentariosComponent,
    OfertasSegmentosComponent,
    OfertaCompraComponent,
    OfertaCompraFinalComponent,
    ShareComponent,
    ShareEmailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    FormsModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    IonicSelectableModule,
    SocketIoModule.forRoot(config),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    File,
    Camera,
    OneSignal,
    CallNumber,
    //Facebook,
    SocialSharing,
    NativeStorage,
    HTTP,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
