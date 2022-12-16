import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PublicacionesService } from '../../publicaciones/servicios/publicaciones.service';
import { CarritoService } from '../../carritos/services/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit ,AfterViewInit{
  
  cantidadCarrito:number = 0;
  id:string = '0';

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  
  constructor(private publicacionesServicio:PublicacionesService, private carritoServicio:CarritoService) { }


  ngOnInit(): void {
    if(localStorage.getItem("carrito")!=null){
      this.carritoServicio.actualizarIconoCarrito().subscribe((carrito) => {
          this.cantidadCarrito = carrito.items.reduce((acumulador, item) => acumulador + item.cantidad, 0);
          this.carritoServicio.setCantidadEnCarrito(this.cantidadCarrito);
          this.id=localStorage.getItem("carrito")!;
       });
    }
  }

  ngAfterViewInit(): void {
    this.carritoServicio.cantidad.subscribe(() => {
      this.cantidadCarrito = this.carritoServicio.getCantidadCarrito();
    });
  }


  buscar(evento:any){
    evento.preventDefault();
    const valor = this.txtBuscar.nativeElement.value;
    this.publicacionesServicio.setBusqueda(valor);
  }

  
}
