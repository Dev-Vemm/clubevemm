import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegmentosPage } from './segmentos.page';

const routes: Routes = [
  {
    path: '',
    component: SegmentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentosPageRoutingModule {}
