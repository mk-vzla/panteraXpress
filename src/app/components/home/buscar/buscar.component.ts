import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BusRutasService, RutaBus } from '../../../services/bus-rutas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
  standalone: false,
})
export class BuscarComponent implements OnInit {
  origen: string = 'Santiago';
  destino: string = 'Antofagasta';
  fechaMinima: Date = new Date();
  fecha: Date | null = new Date();

  llegadaFecha: Date | string = '';
  llegadaHora: string = '';

  resultados: RutaBus[] = [];
  mostrarResultados: boolean = false;

  listaOrigenes: string[] = [];
  listaDestinos: string[] = [];

  salidaSeleccionada: string | null = null;
  mensajeError: string = '';

  @Output() continuarSeleccion: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private busRutasService: BusRutasService) {
    this.listaOrigenes = Array.from(new Set(this.busRutasService.rutas.map(r => r.origen)));
    this.actualizarDestinos();
  }

  ngOnInit() {}

  actualizarDestinos() {
    if (this.origen) {
      this.listaDestinos = Array.from(
        new Set(
          this.busRutasService.rutas
            .filter(r => r.origen === this.origen && r.destino !== this.origen)
            .map(r => r.destino)
        )
      );
      if (this.origen !== 'Santiago' && this.listaDestinos.includes('Santiago')) {
        this.destino = 'Santiago';
      } else if (this.origen === 'Santiago' && !this.listaDestinos.includes(this.destino)) {
        this.destino = this.listaDestinos.length > 0 ? this.listaDestinos[0] : '';
      } else if (!this.listaDestinos.includes(this.destino)) {
        this.destino = '';
      }
    } else {
      this.listaDestinos = Array.from(
        new Set(
          this.busRutasService.rutas
            .filter(r => r.destino !== this.origen)
            .map(r => r.destino)
        )
      );
    }
  }

  seleccionarSalida(salida: string) {
    this.salidaSeleccionada = salida;
  }

  buscarBuses() {
    this.mensajeError = '';
    if (!this.origen || !this.destino || !this.fecha) {
      this.mensajeError = 'Por favor, completa todos los campos antes de buscar.';
      this.mostrarResultados = false;
      return;
    }
    this.resultados = this.busRutasService.rutas.filter(r =>
      (!this.origen || r.origen === this.origen) &&
      (!this.destino || r.destino === this.destino)
    );
    this.mostrarResultados = true;
    this.salidaSeleccionada = null;
  }

  irASeleccionAsiento() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.continuarSeleccion.emit({
      origen: this.origen,
      destino: this.destino,
      fecha: this.fecha instanceof Date ? this.fecha.toISOString() : this.fecha,
      salida: this.salidaSeleccionada
    });
  }

  salidasDisponibles(): string[] {
    if (this.resultados.length !== 1) return [];
    const salidas = this.resultados[0].salidas;
    if (!this.fecha) return salidas;
    const fechaSeleccionada = new Date(this.fecha);
    const hoy = new Date();
    if (
      fechaSeleccionada.getFullYear() === hoy.getFullYear() &&
      fechaSeleccionada.getMonth() === hoy.getMonth() &&
      fechaSeleccionada.getDate() === hoy.getDate()
    ) {
      const ahora = hoy.getHours() * 60 + hoy.getMinutes();
      return salidas.filter(horaStr => {
        const [h, m] = horaStr.split(':').map(Number);
        return h * 60 + m > ahora;
      });
    }
    return salidas;
  }
}
