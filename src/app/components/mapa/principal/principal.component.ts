import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapasService } from '../../../services/mapas-service.service';
import { TerminalesService } from '../../../services/terminales.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone: false
})
export class PrincipalComponent implements AfterViewInit {
  private map!: L.Map;                  // Referencia al mapa Leaflet
  private busMarker?: L.Marker;         // Marcador del bus en tiempo real
  private rutaPolyline?: L.Polyline;    // Línea que muestra la ruta en el mapa
  private etaPopup?: L.Popup;           // Popup que muestra ETA sobre el destino

  public destino = 'Arica';            // Destino actual
  public origen = 'Santiago';          // Origen actual
  private coordDestino: [number, number] | null = null; // Coordenadas del destino

  constructor(
    private mapasService: MapasService,          // Servicio para ubicación y cálculo de rutas
    private terminalesService: TerminalesService // Servicio para obtener coordenadas de terminales
  ) { }

  async ngAfterViewInit() {
    const latInicial = -33.45694; // Latitud inicial (Santiago)
    const lngInicial = -70.64827; // Longitud inicial (Santiago)
    const zoomInicial = 6;         // Zoom inicial del mapa

    // Leer origen y destino desde localStorage si existen
    const origenLS = localStorage.getItem('origenSeleccionado');
    const destinoLS = localStorage.getItem('destinoSeleccionado');
    if (origenLS) this.origen = origenLS;
    if (destinoLS) this.destino = destinoLS;

    // Inicializamos el mapa con OpenStreetMap
    this.map = L.map('map').setView([latInicial, lngInicial], zoomInicial);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

    // Forzar redibujado para prevenir errores de tamaño
    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);

    this.coordDestino = this.terminalesService.getCoordenadas(this.destino); // Coordenadas del destino
    const coordOrigen = this.terminalesService.getCoordenadas(this.origen);       // Coordenadas del origen

    // Si existen las coordenadas de origen y destino, calculamos y dibujamos la ruta
    if (coordOrigen && this.coordDestino) {
      const ruta = await this.mapasService.calcularRuta(coordOrigen, this.coordDestino);
      const coords = this.decodePolyline(ruta.geometry); // Decodificamos polyline de OSRM
      this.rutaPolyline = L.polyline(coords, { color: 'blue', weight: 4 }).addTo(this.map); // Dibujamos la línea
      const bounds = this.rutaPolyline.getBounds();
      this.map.fitBounds(bounds, { maxZoom: 12 }); // Ajustamos vista para mostrar toda la ruta, limitando el zoom máximo
    }

    // Configuramos el ícono del bus
    const iconoBus = L.icon({
      iconUrl: 'assets/bus-icon.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    // Creamos un popup vacío en el destino para mostrar el ETA
    this.etaPopup = L.popup({ autoClose: false, closeOnClick: false }).setLatLng(this.coordDestino!).addTo(this.map);

    // Iniciamos seguimiento en tiempo real usando el GPS del dispositivo
    this.mapasService.obtenerWatch(async (pos: any) => {
      if (pos && pos.coords && this.coordDestino) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Si el marcador del bus ya existe, actualizamos su posición, de lo contrario lo creamos
        if (this.busMarker) {
          this.busMarker.setLatLng([lat, lng]);
        } else {
          this.busMarker = L.marker([lat, lng], { icon: iconoBus }).addTo(this.map);
        }

        // Centrar en el marcador del bus (opcional)
        // this.map.setView([lat, lng], zoomInicial); // <-- Quitado para que el mapa no se centre en el bus

        // Calculamos ETA en tiempo real desde la posición actual del bus al destino
        try {
          const ruta = await this.mapasService.calcularRuta([lat, lng], this.coordDestino);
          const duracionHoras = (ruta.duration / 3600); // segundos ➔ horas
          const horas = Math.floor(duracionHoras);
          const minutos = Math.round((duracionHoras - horas) * 60);

          // Actualizamos el contenido del popup ETA en el destino
          if (this.etaPopup) {
            this.etaPopup
              .setLatLng(this.coordDestino)
              .setContent(`Llegada estimada: ${horas}h ${minutos}m`);
          }
        } catch (error) {
          console.error('Error calculando ETA dinámico:', error);
        }
      }
    });
  }

  /**
   * Decodifica un polyline codificado en formato polyline5 (OSRM) a un array de coordenadas
   * para poder dibujar la ruta en el mapa con Leaflet.
   */
  decodePolyline(str: string, precision: number = 5): [number, number][] {
    let index = 0, lat = 0, lng = 0, coordinates: [number, number][] = [];
    const factor = Math.pow(10, precision);

    while (index < str.length) {
      let result = 1, shift = 0, b;
      do {
        b = str.charCodeAt(index++) - 63 - 1;
        result += b << shift;
        shift += 5;
      } while (b >= 0x1f);
      lat += (result & 1) ? ~(result >> 1) : (result >> 1);

      result = 1;
      shift = 0;
      do {
        b = str.charCodeAt(index++) - 63 - 1;
        result += b << shift;
        shift += 5;
      } while (b >= 0x1f);
      lng += (result & 1) ? ~(result >> 1) : (result >> 1);

      coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
  }
}
