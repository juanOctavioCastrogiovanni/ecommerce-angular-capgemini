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

    constructor(private publicacionServicio: PublicacionesService, private carritoServicio:CarritoService) { }

    

    ngOnInit(): void {
      
      const url = window.location.href;

      const id = url.split('/')[4];

        this.publicacionServicio.publicacionDetalle(id).subscribe( resp => {
            this.publicacionDetalle = resp;
            console.log(this.publicacionDetalle);
        });
    }

    agregarAlCarrito(id: number | undefined){
      this.carritoServicio.sumarAlCarrito(id);
    }

}
