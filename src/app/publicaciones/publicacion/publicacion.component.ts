import { Component } from '@angular/core';
import { Publicacion } from '../Interfaces/publicacion.interface';
import { PublicacionesService } from '../servicios/publicaciones.service';
import { CarritoService } from 'src/app/carritos/services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
})
export class PublicacionComponent {
  publicacionDetalle: Publicacion | undefined;

    // Se inyecta el servicio de publicaciones y el servicio de carrito
    // The publications service and the cart service are injected
    constructor(private publicacionServicio: PublicacionesService, private carritoServicio:CarritoService) { }

    
    // Se obtiene el id de la publicacion desde la url y se hace una peticion al servicio de publicaciones para obtener la publicacion con ese id
    // The publication id is obtained from the url and a request is made to the publications service to obtain the publication with that id
    ngOnInit(): void {
      
      const url = window.location.href;

      const id = url.split('/')[4];

        this.publicacionServicio.publicacionDetalle(id).subscribe( resp => {
            this.publicacionDetalle = resp;
        });
    }

    agregarAlCarrito(id: number | undefined){
      this.carritoServicio.sumarAlCarrito(id);
    }

}
