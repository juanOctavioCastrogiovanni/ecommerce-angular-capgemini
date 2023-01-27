import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Carrito } from '../interfaces/carrito.interface';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
})
export class CarritoComponent implements OnInit, AfterViewInit{
  carrito: Carrito | undefined;

  private load : any = document.querySelector('.load')
  private body : any = document.querySelector('body')

  constructor(private carritoServicio:CarritoService) { }

  // En el principio del ciclo de vida, activo la pantalla de carga hasta que responda la peticion a la api 
  // At the beginning of the life cycle, I activate the loading screen until the request to the api responds
  ngOnInit(): void {
    this.load.style.display = 'block';
    this.body.style.opacity= '0.5';

    this.llamarApi()
  }

  ngAfterViewInit(): void {
    // Si modifico la cantidad refresca el evento y vuelve a llamar a la api
    // If I modify the quantity, it refreshes the event and calls the api again
    this.carritoServicio.cantidad.subscribe(() => {
      this.llamarApi();
    });
  }


  private llamarApi(){
    const url = window.location.href;

      const id = url.split('/')[4];

        this.carritoServicio.traerCarrito(id).subscribe( resp => {
            this.carrito = resp;
            const cantidad = resp.items.reduce((acumulador, item) => acumulador + item.cantidad, 0);

            this.carritoServicio.setCantidadEnCarrito(cantidad)

        });
  }
}
