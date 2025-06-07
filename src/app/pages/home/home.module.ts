import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { MaterialModule } from '../../material.module'; // <-- Añadir

import { FormatearFechaPipe } from '../../pipes/formatear-fecha.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MaterialModule,
  ],
  declarations: [HomePage, FormatearFechaPipe] ,
  exports: [
    FormatearFechaPipe
  ]
})
export class HomePageModule {}
