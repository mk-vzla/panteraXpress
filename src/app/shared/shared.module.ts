import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatearFechaPipe } from '../pipes/formatear-fecha.pipe';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [FormatearFechaPipe, ],
  imports: [CommonModule, MaterialModule],
  exports: [FormatearFechaPipe, ],
})
export class SharedModule {}