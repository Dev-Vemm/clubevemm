import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CupomPage } from './cupom.page';

const routes: Routes = [
  {
    path: '',
    component: CupomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CupomPageRoutingModule {}
