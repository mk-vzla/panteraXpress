import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsientosBusService } from '../../services/bus-asientos.service';

@Component({
  selector: 'app-asiento',
  templateUrl: './asiento.page.html',
  styleUrls: ['./asiento.page.scss'],
  standalone: false
})
export class AsientoPage implements OnInit {
  origen: string = '';
  destino: string = '';
  fecha: string = '';
  salida: string = '';

  filas: { ladoIzq: number[]; ladoDer: number[] }[] = [];
  asientoSeleccionado: number | null = null;
  asientosDisponibles: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private busAsientosService: AsientosBusService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.origen = params['origen'] || '';
      this.destino = params['destino'] || '';
      this.fecha = params['fecha'] || ''; 
      this.salida = params['salida'] || '';
    });


    // Generar estructura de asientos: 9 filas de 2-espacio-2 (4 asientos por fila, 9x4=36)
    let numero = 1;
    for (let i = 0; i < 9; i++) {
      this.filas.push({
        ladoIzq: [numero++, numero++],
        ladoDer: [numero++, numero++]
      });
    }

    // Obtener asientos disponibles desde el servicio
    this.asientosDisponibles = this.busAsientosService.obtenerAsientos()
      .map((ocupado, idx) => ocupado ? null : idx + 1)
      .filter(n => n !== null) as number[];
  }

  seleccionarAsiento(asiento: number) {
    if (this.asientosDisponibles.includes(asiento)) {
      this.asientoSeleccionado = asiento;
    }
  }
}
