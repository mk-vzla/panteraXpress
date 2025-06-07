import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AsientoPageRoutingModule } from './asiento-routing.module';

import { AsientoPage } from './asiento.page';

import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsientoPageRoutingModule,
    MaterialModule,
    SharedModule 
  ],
  declarations: [AsientoPage, ],
  exports: [
    
  ]
})
export class AsientoPageModule {}
