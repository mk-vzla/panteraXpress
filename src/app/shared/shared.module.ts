import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatearFechaPipe } from '../pipes/formatear-fecha.pipe';

@NgModule({
  declarations: [FormatearFechaPipe],
  imports: [CommonModule],
  exports: [FormatearFechaPipe]
})
export class SharedModule {}
