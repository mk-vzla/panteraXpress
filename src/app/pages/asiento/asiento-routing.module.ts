import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsientoPage } from './asiento.page';

const routes: Routes = [
  {
    path: '',
    component: AsientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsientoPageRoutingModule {}
