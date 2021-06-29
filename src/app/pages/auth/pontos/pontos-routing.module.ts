import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PontosPage } from './pontos.page';

const routes: Routes = [
  {
    path: '',
    component: PontosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PontosPageRoutingModule {}
