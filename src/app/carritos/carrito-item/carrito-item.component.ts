import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../interfaces/carrito.interface';
import { CarritoService } from 'src/app/carritos/services/carrito.service';

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
})
export class CarritoItemComponent {
  @Input() item: Item | undefined;

  constructor(private carritoServicio:CarritoService) { }

  // Agrega en uno la cantidad del item seleccionado
  // Adds one to the quantity of the selected item
  agregarAlCarrito(id: number | undefined){
    this.carritoServicio.sumarAlCarrito(id);
    
  }

  // Resta en uno la cantidad del item seleccionado
  // Subtracts one from the quantity of the selected item
  restarCarrito(id: number | undefined){
    this.carritoServicio.restarAlCarrito(id);
    
  }

  // Elimina el item seleccionado del carrito
  // Deletes the selected item from the cart
  eliminarItem(id: number | undefined, cantidad : number | undefined){
    this.carritoServicio.eliminarItem(id,cantidad!);
    
  }

}
