import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TerminalesService {
  terminales: { [ciudad: string]: [number, number] } = {
    'Santiago': [-33.45694, -70.64827],
    'Antofagasta': [-23.65236, -70.39540],
    'Arica': [-18.47460, -70.29792],
    'Concepción': [-36.82699, -73.04977],
    'Iquique': [-20.21326, -70.15027],
    'La Serena': [-29.91062, -71.25663],
    'Puerto Montt': [-41.46930, -72.94237],
    'Rancagua': [-34.17083, -70.74444],
    'Temuco': [-38.73965, -72.59842],
    'Valparaíso': [-33.03600, -71.62963],
    'Viña del Mar': [-33.02457, -71.55183]
  };

  getCoordenadas(ciudad: string): [number, number] | null {
    return this.terminales[ciudad] || null;
  }
}