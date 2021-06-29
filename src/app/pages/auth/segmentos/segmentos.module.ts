import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegmentosPageRoutingModule } from './segmentos-routing.module';

import { SegmentosPage } from './segmentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegmentosPageRoutingModule
  ],
  declarations: [SegmentosPage]
})
export class SegmentosPageModule {}
