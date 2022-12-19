import { Component, Input } from '@angular/core';
import { Venta } from 'src/app/compra/interfaces/venta.interface';
import { Carrito } from '../interfaces/carrito.interface';

@Component({
  selector: 'app-carrito-tarjeta',
  templateUrl: './carrito-tarjeta.component.html',
})
export class CarritoTarjetaComponent {
  @Input() item: Venta | undefined;
}
