import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraFinalizadaComponent } from './compra-finalizada.component';



@NgModule({
  declarations: [
  CompraFinalizadaComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompraFinalizadaComponent 
  ]
  
})
export class CompraModule { }
