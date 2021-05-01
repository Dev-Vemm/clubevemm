import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResgateDetalhesPage } from './resgate-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: ResgateDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResgateDetalhesPageRoutingModule {}
