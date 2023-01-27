import { Component, Input } from '@angular/core';
import { CarritoService } from 'src/app/carritos/services/carrito.service';
import Swal from 'sweetalert2';
import { PaginacionPublicacion, Publicacion } from '../../Interfaces/publicacion.interface';
import { PublicacionesService } from '../../servicios/publicaciones.service';

@Component({
  selector: 'app-publicacion-tarjeta',
  templateUrl: './publicacion-tarjeta.component.html',
})
export class PublicacionTarjetaComponent {

  // <!-- Para esto se usa el decorador @Input() publicaciones: Publicacion; en el componente publicacion-tarjeta.component.ts -->
  // <!-- En el componente publicaciones-tarjetas.component.html se usa el selector <app-publicacion-tarjeta [publicaciones]="publicacion" *ngFor="let publicacion of publicaciones"></app-publicacion-tarjeta> -->
  @Input() publicaciones: Publicacion | undefined;

  constructor(private carritoServicio:CarritoService, private publicacionServicio: PublicacionesService) { }

  // Este metodo llama al metodo sumarAlCarrito(idDeLaPublicacion) dentro del servicio del carrito
  // this method calls the sumarAlCarrito(idDeLaPublicacion) method within the cart service
  agregarAlCarrito(id: number | undefined){
    this.carritoServicio.sumarAlCarrito(id);
  }
}
