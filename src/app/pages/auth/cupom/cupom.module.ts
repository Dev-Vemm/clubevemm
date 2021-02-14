import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CupomPageRoutingModule } from './cupom-routing.module';

import { CupomPage } from './cupom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CupomPageRoutingModule
  ],
  declarations: [CupomPage]
})
export class CupomPageModule {}
