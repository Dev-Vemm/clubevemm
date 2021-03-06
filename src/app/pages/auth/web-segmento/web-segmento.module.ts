import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

import { IonicModule } from '@ionic/angular';

import { WebSegmentoPageRoutingModule } from './web-segmento-routing.module';

import { WebSegmentoPage } from './web-segmento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebSegmentoPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [WebSegmentoPage]
})
export class WebSegmentoPageModule {}
