import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraFinalizadaComponent } from './compra-finalizada.component';
import { ItemPagoComponent } from './item-pago/item-pago.component';



@NgModule({
  declarations: [CompraFinalizadaComponent,
  ItemPagoComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CompraFinalizadaComponent 
  ]
  
})
export class CompraModule { }
