import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Carrito } from '../interfaces/carrito.interface';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
})
export class CarritoComponent implements OnInit, AfterViewInit{
  carrito: Carrito | undefined;

  constructor(private carritoServicio:CarritoService) { }

  ngOnInit(): void {
    this.llamarApi()
  }

  ngAfterViewInit(): void {
    this.carritoServicio.cantidad.subscribe(() => {
      this.llamarApi();
    });
  }


  private llamarApi(){
    const url = window.location.href;

      const id = url.split('/')[4];

        this.carritoServicio.traerCarrito(id).subscribe( resp => {
            this.carrito = resp;
        });
  }
}
