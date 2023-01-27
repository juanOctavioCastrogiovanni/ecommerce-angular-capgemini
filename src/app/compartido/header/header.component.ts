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

  private load : any = document.querySelector('.load')
  private body : any = document.querySelector('body')
  
  cantidadCarrito:number = 0;
  id:string = '0';
  usuario: string = '';
  color: string= '';
  usuarioId: number = 0;

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  
  constructor(private publicacionesServicio:PublicacionesService,private loginServicio: AuthService,private carritoServicio:CarritoService, private router: Router, private route: ActivatedRoute) { }

  // Verifico si estoy logueado
  // I check if I am logged in
  ngOnInit(): void {
    if(localStorage.getItem("carrito")!=null){
      this.carritoServicio.actualizarIconoCarrito().subscribe((carrito) => {
          this.cantidadCarrito = carrito.items.reduce((acumulador, item) => acumulador + item.cantidad, 0);
          this.carritoServicio.setCantidadEnCarrito(this.cantidadCarrito);
          this.id=localStorage.getItem("carrito")!;
       });
    }

    // Si es asi guardo un string con el color
    // If so, I save a string with the color
    this.cargarInfo()
  }
  
  // Si se cambia el numero de icono ejecuto el getter para saber la cantidad de productos en el carrito y lo almaceno en el atributo interno del componente
  // Tambien almaceno el id del cliente en el atributo interno del componente
  // corto el tiempo de carga

  // If the number of icons changes, I execute the getter to know the number of products in the cart and store it in the internal attribute of the component
  // I also store the client id in the internal attribute of the component
  // I cut the loading time

  ngAfterViewInit(): void {
    this.carritoServicio.numeroIcono.subscribe(() => {
      this.cantidadCarrito = this.carritoServicio.getCantidadCarrito();
      this.id=localStorage.getItem("carrito")!;
      
      setTimeout(() => {
        this.body.style.opacity= '1';
        this.load.style.display = 'none';
      }, 1000);
      
    });
    this.loginServicio.sesion.subscribe((color) => {
    this.cargarInfo()
    })
  }

  // Verifica si esta logueado, si es asi borro el localstorage cambio de color y redirijo a /
  // It checks if it is logged in, if so it deletes the localstorage changes color and redirects to /
  cerrarSesion(){
    if(localStorage.getItem("cliente")!){
      localStorage.removeItem("cliente");
      localStorage.removeItem("clienteId");
      this.loginServicio.cambiarColor("");
      this.router.navigate(["/"]);
    }
  }

//  Arma el queryParams con la busqueda
//  Assembles the queryParams with the search
  buscar(evento:any){
    evento.preventDefault();
    const valor = this.txtBuscar.nativeElement.value;

    let obj: Params= {}
    let filtros : string[] = [] ;
    let parametros : string = "";

    filtrosVarios(obj, filtros, parametros, valor, valor, "busqueda", this.route, this.router, this.publicacionesServicio);


    this.publicacionesServicio.setBusqueda(valor);
  }


  // Al cargar los colores guardo informacion del usuario ademas hacer eso
  // When loading the colors I save information about the user in addition to doing that
  private cargarInfo(){
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
