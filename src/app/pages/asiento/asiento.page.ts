import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsientosBusService } from '../../services/bus-asientos.service';
import { BusRutasService, RutaBus } from '../../services/bus-rutas.service';

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
  asientosSeleccionados: number[] = [];
  rutaSeleccionada: RutaBus | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busAsientosService: AsientosBusService,
    private busRutasService: BusRutasService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.origen = params['origen'] || '';
      this.destino = params['destino'] || '';
      this.fecha = params['fecha'] || '';
      this.salida = params['salida'] || '';
      this.rutaSeleccionada = this.busRutasService.rutas.find(
        r => r.origen === this.origen && r.destino === this.destino
      );
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

    this.asientosSeleccionados = [];
  }

  /**
   * Selecciona o deselecciona un asiento dado su número.
   * 
   * Si el asiento está disponible y no ha sido seleccionado previamente, lo agrega a la lista de asientos seleccionados.
   * Si el asiento ya estaba seleccionado, lo elimina de la lista de seleccionados.
   * 
   * @param asiento - El número del asiento a seleccionar o deseleccionar.
   */
  seleccionarAsiento(asiento: number) {
    if (!this.asientosDisponibles.includes(asiento)) return;
    const idx = this.asientosSeleccionados.indexOf(asiento);
    if (idx === -1) {
      this.asientosSeleccionados.push(asiento);
    } else {
      this.asientosSeleccionados.splice(idx, 1);
    }
  }

  continuar() {
    if (!this.rutaSeleccionada) return;
    this.router.navigate(['/resumen'], {
      queryParams: {
        origen: this.origen,
        destino: this.destino,
        duracion: this.rutaSeleccionada.duracion,
        precio: this.rutaSeleccionada.precio,
        salida: this.salida,
        asientos: this.asientosSeleccionados.join(', ')
      }
    });
  }
}
