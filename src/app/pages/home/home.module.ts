import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';
import { BuscarComponent } from '../../components/home/buscar/buscar.component';
import { AsientoComponent } from '../../components/home/asiento/asiento.component';
import { ResumenComponent } from '../../components/home/resumen/resumen.component';

import { PrincipalComponent } from '../../components/mapa/principal/principal.component';

import { PasajesComponent } from '../../components/pasajes/pasajes.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [HomePage, BuscarComponent, AsientoComponent, ResumenComponent, PrincipalComponent, PasajesComponent],
  exports: [
    
  ]
})
export class HomePageModule {}
