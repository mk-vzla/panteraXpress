import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AsientoPageRoutingModule } from './asiento-routing.module';

import { AsientoPage } from './asiento.page';

import { MaterialModule } from '../../material.module';
import { FormatearFechaPipe } from '../../pipes/formatear-fecha.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsientoPageRoutingModule,
    MaterialModule, // <-- Añadir
  ],
  declarations: [AsientoPage, FormatearFechaPipe],
  exports: [
    FormatearFechaPipe
  ]
})
export class AsientoPageModule {}
