import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicacionesPage } from './indicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: IndicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndicacionesPageRoutingModule {}
