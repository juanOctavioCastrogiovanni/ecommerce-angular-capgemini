import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TiposDePago } from '../../interfaces/carrito.interface';

@Component({
  selector: 'app-item-pago',
  templateUrl: './item-pago.component.html',
})
export class ItemPagoComponent {
  @Input () pago: TiposDePago | undefined;

  @Output() cambioDePago : EventEmitter<boolean>= new EventEmitter();

  efectivo(evento:any){
    (evento.target.attributes.id.value == 'Efectivo')? this.cambioDePago.emit(true) : this.cambioDePago.emit(false);
  }
}
