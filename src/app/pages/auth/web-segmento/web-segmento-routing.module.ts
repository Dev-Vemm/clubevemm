import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebSegmentoPage } from './web-segmento.page';

const routes: Routes = [
  {
    path: '',
    component: WebSegmentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebSegmentoPageRoutingModule {}
