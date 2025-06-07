import { Injectable } from '@angular/core';

export interface RutaBus {
  origen: string;
  destino: string;
  duracion: string;
  precio: string;
  salidas: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BusRutasService {

  rutas: RutaBus[] = [
    { origen: 'Santiago', destino: 'Antofagasta', duracion: '18h', precio: '$21.700', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Santiago', destino: 'Arica', duracion: '30h', precio: '$30.200', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Santiago', destino: 'Concepción', duracion: '5h 30m', precio: '$10.500', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Santiago', destino: 'Iquique', duracion: '24h', precio: '$28.800', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Santiago', destino: 'La Serena', duracion: '6h', precio: '$7.500', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Santiago', destino: 'Puerto Montt', duracion: '12h', precio: '$12.300', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Santiago', destino: 'Rancagua', duracion: '1h', precio: '$2.900', salidas: ['06:00', '10:00', '14:00', '18:00', '22:00'] },
    { origen: 'Santiago', destino: 'Temuco', duracion: '8h', precio: '$9.100', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Santiago', destino: 'Valparaíso', duracion: '1h 30m', precio: '$2.500', salidas: ['06:00', '10:00', '14:00', '18:00', '22:00'] },
    { origen: 'Santiago', destino: 'Viña del Mar', duracion: '1h 30m', precio: '$2.500', salidas: ['06:00', '10:00', '14:00', '18:00', '22:00'] },
    { origen: 'Antofagasta', destino: 'Santiago', duracion: '18h', precio: '$21.700', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Arica', destino: 'Santiago', duracion: '30h', precio: '$30.200', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Concepción', destino: 'Santiago', duracion: '5h 30m', precio: '$10.500', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Iquique', destino: 'Santiago', duracion: '24h', precio: '$28.800', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'La Serena', destino: 'Santiago', duracion: '6h', precio: '$7.500', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Puerto Montt', destino: 'Santiago', duracion: '12h', precio: '$12.300', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Rancagua', destino: 'Santiago', duracion: '1h', precio: '$2.900', salidas: ['06:00', '10:00', '14:00', '18:00', '22:00'] },
    { origen: 'Temuco', destino: 'Santiago', duracion: '8h', precio: '$9.100', salidas: ['06:00', '12:00', '18:00'] },
    { origen: 'Valparaíso', destino: 'Santiago', duracion: '1h 30m', precio: '$2.500', salidas: ['06:00', '10:00', '14:00', '18:00', '22:00'] },
    { origen: 'Viña del Mar', destino: 'Santiago', duracion: '1h 30m', precio: '$2.500', salidas: ['06:00', '10:00', '14:00', '18:00', '22:00'] }
  ];

  constructor() { }
}
