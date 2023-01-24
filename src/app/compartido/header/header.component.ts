import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PublicacionesService } from '../../publicaciones/servicios/publicaciones.service';
import { CarritoService } from '../../carritos/services/carrito.service';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Params } from 'src/app/publicaciones/Interfaces/params.interface';
import { filtrosVarios } from 'src/app/publicaciones/funciones/filtrosVarios';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit ,AfterViewInit{
  
  cantidadCarrito:number = 0;
  id:string = '0';
  usuario: string = '';
  color: string= '';
  usuarioId: number = 0;

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  
  constructor(private publicacionesServicio:PublicacionesService,private loginServicio: AuthService,private carritoServicio:CarritoService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    if(localStorage.getItem("carrito")!=null){
      this.carritoServicio.actualizarIconoCarrito().subscribe((carrito) => {
          this.cantidadCarrito = carrito.items.reduce((acumulador, item) => acumulador + item.cantidad, 0);
          this.carritoServicio.setCantidadEnCarrito(this.cantidadCarrito);
          this.id=localStorage.getItem("carrito")!;
       });
    }

    this.cargarColores()
  }
  
  ngAfterViewInit(): void {
    this.carritoServicio.cantidad.subscribe(() => {
      this.cantidadCarrito = this.carritoServicio.getCantidadCarrito();
      this.id=localStorage.getItem("carrito")!;
    });
    this.loginServicio.sesion.subscribe((color) => {
    this.cargarColores()
    })
  }

  cerrarSesion(){
    if(localStorage.getItem("cliente")!){
      localStorage.removeItem("cliente");
      localStorage.removeItem("clienteId");
      this.loginServicio.cambiarColor("");
      this.router.navigate(["/"]);
    }
  }


  buscar(evento:any){
    evento.preventDefault();
    const valor = this.txtBuscar.nativeElement.value;

    let obj: Params= {}
    let filtros : string[] = [] ;
    let parametros : string = "";

    filtrosVarios(obj, filtros, parametros, valor, valor, "busqueda", this.route, this.router, this.publicacionesServicio);


    this.publicacionesServicio.setBusqueda(valor);
  }



  private cargarColores(){
    if(localStorage.getItem("cliente")!=null){
      this.usuario = JSON.parse(localStorage.getItem("cliente")!);
      this.usuarioId = JSON.parse(localStorage.getItem("clienteId")!);
      this.color = "color: red";
    } else {
      this.color = "";
      this.usuario = "";

    }
  }

  
}
