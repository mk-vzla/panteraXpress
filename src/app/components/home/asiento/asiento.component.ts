import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsientosBusService } from '../../../services/bus-asientos.service';
import { BusRutasService, RutaBus } from '../../../services/bus-rutas.service';

@Component({
  selector: 'app-asiento',
  templateUrl: './asiento.component.html',
  styleUrls: ['./asiento.component.scss'],
  standalone: false
})
export class AsientoComponent implements OnInit {
  @Input() origen: string = '';
  @Input() destino: string = '';
  @Input() fecha: string = '';
  @Input() salida: string = '';

  @Output() continuarResumen = new EventEmitter<any>();

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
    // Si los datos no vienen por @Input, intentar obtenerlos de la ruta (para compatibilidad)
    if (!this.origen || !this.destino || !this.fecha || !this.salida) {
      this.route.queryParams.subscribe(params => {
        this.origen = params['origen'] || this.origen;
        this.destino = params['destino'] || this.destino;
        this.fecha = params['fecha'] || this.fecha;
        this.salida = params['salida'] || this.salida;
        this.rutaSeleccionada = this.busRutasService.rutas.find(
          (r: RutaBus) => r.origen === this.origen && r.destino === this.destino
        );
      });
    } else {
      this.rutaSeleccionada = this.busRutasService.rutas.find(
        (r: RutaBus) => r.origen === this.origen && r.destino === this.destino
      );
    }

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
      .map((ocupado: boolean, idx: number) => ocupado ? null : idx + 1)
      .filter((n: number | null) => n !== null) as number[];

    this.asientosSeleccionados = [];
  }

  seleccionarAsiento(asiento: number, event?: Event) {
    if (!this.asientosDisponibles.includes(asiento)) return;
    const idx = this.asientosSeleccionados.indexOf(asiento);
    if (idx === -1) {
      this.asientosSeleccionados.push(asiento);
    } else {
      this.asientosSeleccionados.splice(idx, 1);
    }
    if (event) {
      (event.target as HTMLElement).blur();
    }
  }

  continuar() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (!this.rutaSeleccionada) return;
    this.continuarResumen.emit({
      origen: this.origen,
      destino: this.destino,
      duracion: this.rutaSeleccionada.duracion,
      precio: this.rutaSeleccionada.precio,
      salida: this.salida,
      fecha: this.fecha,
      asientos: this.asientosSeleccionados.join(', ')
    });
  }
}
