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

  agregarAlCarrito(id: number | undefined){
    this.carritoServicio.sumarAlCarrito(id);
    
  }

  restarCarrito(id: number | undefined){
    this.carritoServicio.restarAlCarrito(id);
    
  }

  eliminarItem(id: number | undefined, cantidad : number | undefined){
    this.carritoServicio.eliminarItem(id,cantidad!);
    
  }

}
