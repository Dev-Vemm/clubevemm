import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResgateDetalhesPageRoutingModule } from './resgate-detalhes-routing.module';

import { ResgateDetalhesPage } from './resgate-detalhes.page';

import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    NgCalendarModule,
    FormsModule,
    IonicModule,
    ResgateDetalhesPageRoutingModule
  ],
  declarations: [ResgateDetalhesPage]
})
export class ResgateDetalhesPageModule {}
