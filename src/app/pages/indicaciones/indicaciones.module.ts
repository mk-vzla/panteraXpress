import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndicacionesPageRoutingModule } from './indicaciones-routing.module';

import { IndicacionesPage } from './indicaciones.page';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndicacionesPageRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [IndicacionesPage]
})
export class IndicacionesPageModule {}
