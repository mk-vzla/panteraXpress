import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapasService } from '../../../services/mapas-service.service';

console.log(MapasService);


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone: false
})
export class PrincipalComponent implements AfterViewInit {
  private map!: L.Map;
  private busMarker?: L.Marker;

  constructor(private mapasService: MapasService) {}

  async ngAfterViewInit() {
    const latInicial = -33.45;
    const lngInicial = -70.66;
    const zoomInicial = 15;

    // Inicializar el mapa y guardarlo en la propiedad
    this.map = new L.Map('map').setView([latInicial, lngInicial], zoomInicial);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);

    // Creamos un ícono de bus
    const iconoBus = L.icon({
      iconUrl: 'assets/bus-icon.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
    // Prueba de carga de imagen
    const img = new Image();
    img.src = 'assets/bus-icon.png';
    //img.onload = () => console.log('Ícono de bus cargado correctamente');
    //img.onerror = () => console.error('No se pudo cargar el ícono de bus: assets/bus-icon.png');

    // Usar watch para ubicación en tiempo real
    this.mapasService.obtenerWatch((pos: any) => {
      console.log('Posición recibida en watch:', pos);
      if (pos && pos.coords) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        console.log('Intentando crear/actualizar marcador en:', lat, lng);
        if (this.busMarker) {
          this.busMarker.setLatLng([lat, lng]);
        } else {
          try {
            if (img.complete && img.naturalWidth === 0) {
              this.busMarker = L.marker([lat, lng])
                .addTo(this.map);
            } else {
              this.busMarker = L.marker([lat, lng], { icon: iconoBus })
                .addTo(this.map);
            }
            console.log('Marcador creado correctamente');
          } catch (e) {
            console.error('Error creando el marcador:', e);
          }
        }
        this.map.setView([lat, lng], zoomInicial);
      } else {
        console.warn('No se recibió una posición válida:', pos);
      }
    });
  }
}
