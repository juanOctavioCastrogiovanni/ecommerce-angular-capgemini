import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PublicacionesService } from '../servicios/publicaciones.service';
import { PaginacionPublicacion, Categoria } from '../Interfaces/publicacion.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filtrosVarios } from '../funciones/filtrosVarios';
import { CarritoService } from 'src/app/carritos/services/carrito.service';
import { ObjectUnsubscribedError } from 'rxjs';


@Component({
  selector: 'app-publicaciones-tarjetas',
  templateUrl: './publicaciones-tarjetas.component.html',
})
export class PublicacionesTarjetasComponent implements OnInit, AfterViewInit{
  
  // Al principio se carga la vista de carga
  private load : any = document.querySelector('.load')
  private body : any = document.querySelector('body')
  


  publicacionesApi: PaginacionPublicacion | undefined;
  
//  La busqueda es igual que vacia
  busqueda: string = '' ;

  // En el constructor inyecto los servicios del carrito de publicaciones y de las rutas para la redireccion
  constructor(private carritoServicio:CarritoService, private publicacionServicio: PublicacionesService, private router: Router, private route: ActivatedRoute) { 
    
  }
  
  
  // Cuando inicia el ciclo de vida lo que hace es cargar la pantalla de carga
  ngOnInit(): void {
    let urlModificada = 'https://tp-capgemini-licuadora-production.up.railway.app/publicaciones';
    this.load.style.display = 'block';
    this.body.style.opacity= '0.5';

    // Llama al observable de las publicaciones y este responde, hasta que no responda no termina la pantalla de carga y esta respuesta es asignada 
    // a la variable publicacionesApi
    this.publicacionServicio.buscarPublicaciones(urlModificada).subscribe( resp => {
      this.publicacionesApi = resp;
      console.log(resp);
      this.load.style.display = 'none';
      this.body.style.opacity= '1';
    });
  

    this.busqueda = "";
  }


  // En este siclo de vida que es despues del cambio del evento de la vista, se suscribe a los observables de la cantidad de productos en el carrito 
  // y de la busqueda
  ngAfterViewInit(): void {
    // Si detecta que cambio la cantidad de productos en el carrito, se suscribe a este observable 
    this.carritoServicio.cantidad.subscribe(() => {
      // Si el carrito no es nulo, se llama al servicio del carrito y se le pasa el id del carrito, este servicio devuelve un observable
      if(localStorage.getItem('carrito') != null){
      this.carritoServicio.traerCarrito(localStorage.getItem('carrito')!).subscribe( resp => {
        // Se reduce el array de items del carrito y se suma la cantidad de cada item
        const cantidad = resp.items.reduce((acumulador, item) => acumulador + item.cantidad, 0);

        // Se llama al servicio del carrito y se le pasa la cantidad de productos en el carrito para actualizar el contador
        this.carritoServicio.setCantidadEnCarrito(cantidad)

      });
     }
    })

    // Si detecta que cambio la busqueda, se suscribe a este observable
    this.publicacionServicio.busquedaEvento.subscribe(() => {
      this.busqueda = this.publicacionServicio.getBusqueda();
    })

    // Si detecta que cambio los parametros de queryparams debe realizar nuevamente una peticion a la api para traer las publicaciones filtradas
    // la variable params se envia en el emit del cambio y se usa para construir la url para realizar la peticion.
    this.publicacionServicio.cambio.subscribe((params) => {
      this.body.style.opacity= '0.5';
      this.load.style.display = 'block';

      let urlModificada = 'https://tp-capgemini-licuadora-production.up.railway.app/publicaciones';
      urlModificada = urlModificada.split('?')[0];
      this.llamarApi(urlModificada+params)
      
    });
    // this.publicacionServicio.setBusqueda('')
  }


  //Llma al servicio de publicaciones y le pasa la url modificada, este servicio devuelve un observable y se almacena en publicacionesApi
  private llamarApi(urlModificada: string){
    this.publicacionServicio.buscarPublicaciones(urlModificada).subscribe( resp => {
      this.publicacionesApi = resp; 
      this.load.style.display = 'none';
      this.body.style.opacity= '1';
    });      
  }

  // Cambiar pagina lo que hace es especificar si la pagina se cambio y si es asi, llama a la funcion filtrosVarios que se encarga de construir el queryparams
  // correspondiente es decir, colocara que ?page= la pagina correspondiente

  
  cambiarPagina(pagina:number | undefined){
    
    let pag = pagina!=undefined?pagina.toString(): '';
    let obj: Params= {}
    let filtros : string[] = [] ;
    let parametros : string = "";

    // A esta funcion se le envia por referencia un objeto vacio un array filtros que tambien es vacio y un string parametros que es vacio
    // esta funcion se encarga de construir el queryparams y de asignarle los valores a los parametros que se le pasan por referencia
    
    filtrosVarios(obj, filtros, parametros, pag, pag, "pagina", this.route, this.router, this.publicacionServicio);
  }


    
}
