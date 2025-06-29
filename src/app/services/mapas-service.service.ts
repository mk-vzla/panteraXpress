import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })
export class MapasService {
  async obtenerPosicion(): Promise<{ lat: number, lng: number }> {
    try {
      await Geolocation.requestPermissions(); // SOLICITAR PERMISOS
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      return { lat: pos.coords.latitude, lng: pos.coords.longitude };
    } catch (error) {
      console.error('Error al obtener ubicación en MapasService:', error);
      throw error;
    }
  }

  obtenerWatch(callback: (pos: any) => void) {
    console.log('Iniciando watchPosition...');
    Geolocation.watchPosition({ enableHighAccuracy: true }, (pos, err) => {
      if (err) {
        console.error('Error en watchPosition:', err);
      } else {
        console.log('Posición recibida en MapasService:', pos);
        callback(pos);
      }
    });
  }

  async calcularRuta(start: [number, number], end: [number, number]) {
    const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.routes[0];
  }
}
