import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearFecha',
  standalone: false
})
export class FormatearFechaPipe implements PipeTransform {

  transform(value: Date | string | null | undefined): string {
    if (!value) return '';

    const fecha = typeof value === 'string' ? new Date(value) : value;

    if (isNaN(fecha.getTime())) return '';

    const dia = String(fecha.getDate()).padStart(2, '0');
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }
}
