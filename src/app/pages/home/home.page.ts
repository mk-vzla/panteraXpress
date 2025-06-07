import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusRutasService, RutaBus } from '../../services/bus-rutas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  origen: string = 'Santiago';
  destino: string = 'Antofagasta';
  fechaMinima: Date = new Date();
  fecha: Date | null = new Date();

  resultados: RutaBus[] = [];
  mostrarResultados: boolean = false;

  listaOrigenes: string[] = [];
  listaDestinos: string[] = [];

  salidaSeleccionada: string | null = null;

  mensajeError: string = '';

  constructor(private router: Router, private busRutasService: BusRutasService) {
    this.listaOrigenes = Array.from(new Set(this.busRutasService.rutas.map(r => r.origen)));
    this.actualizarDestinos();
  }

  actualizarDestinos() {
    if (this.origen) {
      this.listaDestinos = Array.from(
        new Set(
          this.busRutasService.rutas
            .filter(r => r.origen === this.origen && r.destino !== this.origen)
            .map(r => r.destino)
        )
      );
      if (!this.listaDestinos.includes(this.destino)) {
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
    if (!this.fecha) {
      this.mostrarResultados = false;
      this.mensajeError = 'Favor seleccione una fecha.';
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
    if (!this.fecha) {
      this.mensajeError = 'Favor seleccione una fecha.';
      this.mostrarResultados = false;
      return;
    }
    if (!this.salidaSeleccionada) {
      this.mensajeError = 'Favor seleccione una salida.';
      this.mostrarResultados = false;
      return;
    }
    this.router.navigate(['/asiento'], {
      queryParams: {
        origen: this.origen,
        destino: this.destino,
        fecha: this.fecha instanceof Date ? this.fecha.toISOString() : this.fecha,
        salida: this.salidaSeleccionada
      }
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
      // Solo mostrar salidas futuras para hoy
      const ahora = hoy.getHours() * 60 + hoy.getMinutes();
      return salidas.filter(horaStr => {
        const [h, m] = horaStr.split(':').map(Number);
        return h * 60 + m > ahora;
      });
    }
    return salidas;
  }
}