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

  @Input() publicaciones: Publicacion | undefined;

  constructor(private carritoServicio:CarritoService, private publicacionServicio: PublicacionesService) { }

  agregarAlCarrito(id: number | undefined){
    this.carritoServicio.sumarAlCarrito(id);
  }
}
