import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BusRutasService, RutaBus } from '../../services/bus-rutas.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  @ViewChild('topRef', { static: false }) ionContent?: IonContent;

  // Segmento seleccionado para navegación
  segmentoSeleccionado = 'tickets';



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

  mostrarSelectorAsiento: boolean = false;
  datosSeleccionados: any = null;

  mostrarResumen: boolean = false;
  datosResumen: any = null;

  constructor(private router: Router, private busRutasService: BusRutasService) {
    this.listaOrigenes = Array.from(new Set(this.busRutasService.rutas.map(r => r.origen)));
    this.actualizarDestinos();
    // Escuchar evento personalizado para abrir el mapa desde pasajes
    window.addEventListener('abrirMapaSegmento', () => {
      this.segmentoSeleccionado = 'unknown2';
    });
    // Escuchar evento personalizado para abrir el segmento de pasajes (resumen)
    window.addEventListener('abrirPasajesSegmento', () => {
      this.segmentoSeleccionado = 'resumen';
      this.mostrarResumen = false;
      this.mostrarSelectorAsiento = false;
    });
  }

  // Método para actualizar la lista de destinos según el origen seleccionado
  // Este método filtra las rutas disponibles en el servicio para obtener los destinos únicos
  actualizarDestinos() {
    if (this.origen) {
      this.listaDestinos = Array.from(
        new Set(
          this.busRutasService.rutas
            .filter(r => r.origen === this.origen && r.destino !== this.origen)
            .map(r => r.destino)
        )
      );
      // Si el origen no es Santiago y Santiago está disponible como destino, seleccionarlo automáticamente
      if (this.origen !== 'Santiago' && this.listaDestinos.includes('Santiago')) {
        this.destino = 'Santiago';
      }
      // Si el origen es Santiago y el destino actual no está disponible, seleccionar el primer destino disponible
      else if (this.origen === 'Santiago' && !this.listaDestinos.includes(this.destino)) {
        this.destino = this.listaDestinos.length > 0 ? this.listaDestinos[0] : '';
      }
      else if (!this.listaDestinos.includes(this.destino)) {
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

  // Método para buscar buses según origen, destino y fecha
  buscarBuses() {
    this.mensajeError = '';

    // Si el origen no es Santiago, cambiar destino automáticamente a Santiago si está disponible
    // if (this.origen !== 'Santiago' && this.listaDestinos.includes('Santiago')) {
    //   this.destino = 'Santiago';
    // }

    // Validar que todos los campos estén completos
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



  // Método para navegar a la página de selección de asiento
  irASeleccionAsiento() {
    // Quitar el foco del elemento activo antes de navegar
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
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

  // Método para obtener las salidas disponibles según la fecha seleccionada y la hora actual del sistema
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

  // Método para navegar a la página de selección de asiento con los datos seleccionados
  onContinuarSeleccion(datos: any) {
    this.datosSeleccionados = datos;
    this.mostrarSelectorAsiento = true;
    setTimeout(() => this.ionContent?.scrollToTop(300), 0);
  }
  // Método para navegar a la página de resumen with los datos seleccionados
  onContinuarResumen(datos: any) {
    this.datosResumen = datos;
    this.mostrarResumen = true;
    this.mostrarSelectorAsiento = false;
    setTimeout(() => this.ionContent?.scrollToTop(300), 0);
  }

  // Método para retroceder en el flujo de navegación
  retrocederFlujo() {
    if (this.mostrarResumen) {
      this.mostrarResumen = false;
      this.mostrarSelectorAsiento = true;
      this.datosResumen = null;
      setTimeout(() => this.ionContent?.scrollToTop(300), 0);
    } else if (this.mostrarSelectorAsiento) {
      this.mostrarSelectorAsiento = false;
      this.datosSeleccionados = null;
      setTimeout(() => this.ionContent?.scrollToTop(300), 0);
    } 
  }

  // Maneja el evento emitido por PasajesComponent para abrir el mapa/principal
  onIrAMapa(event: {origen: string, destino: string}) {
    // Cambia el segmento para mostrar el componente de mapas/principal
    this.segmentoSeleccionado = 'unknown2';
    // Si quieres pasar origen/destino al mapa, puedes usar localStorage o un servicio compartido
    localStorage.setItem('origenSeleccionado', event.origen);
    localStorage.setItem('destinoSeleccionado', event.destino);
  }
}