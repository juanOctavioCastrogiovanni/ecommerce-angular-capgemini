import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Categoria } from '../Interfaces/publicacion.interface';
import {filtrosVarios} from '../funciones/filtrosVarios';

import { PublicacionesService } from '../servicios/publicaciones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
})
export class FiltrosComponent implements OnInit{

categorias: Categoria[] = [];

  tiendas: any[] = [];

  categoriaActual: string = "";
  
  tiendaActual: string = "";

  busquedaActual: string | undefined = undefined;


  constructor(private publicacionServicio:PublicacionesService, private router: Router, private route: ActivatedRoute) { }

  // Al iniciar el ciclo de vida asigno valor a todos los atributos correspondientes a los filtros para poder mostrar tiendas, categorias y busquedas
  // beggining of life cycle, asign value to all attributes corresponding to filters to show stores, categories and searches
  ngOnInit(): void {
    
      this.publicacionServicio.buscarCategorias().subscribe( resp => {
        this.categorias = resp;
      });

      this.publicacionServicio.buscarVendedores().subscribe( resp => {
        this.tiendas = resp;
      })
  }

  // Si hay un cambio por ejemplo una busqueda en el buscador lo que hara es mostrar la busqueda actual para almacenarlo 
  // en busquedaActual y mostrarlo en el boton

  // If there is a change, for example a search in the search engine, it will show the current search to store it
  // in busquedaActual and show it in the button
  ngAfterViewInit(): void {
    this.publicacionServicio.busquedaEvento.subscribe(() => {
      this.busquedaActual = this.publicacionServicio.getBusqueda()
    });

    
  }

  // Al igual que cuando cambio de pagina, esta metodo lo que hace es ejecutar la funcion llamada filtrosVarios y le paso 
  // como parametro "categoria" esto construira la queryParams

  // As with when I change page, this method does is execute the function called filtrosVarios and I pass
  // as a parameter "category" this will build the queryParams
  categoriaABuscar(nombre: string | undefined){
    let busqueda = nombre!=undefined?nombre.replace(' ','-'):''
    let obj: Params= {}
    let filtros : string[] = [] ;
    let parametros : string = "";

    
    filtrosVarios(obj, filtros, parametros, nombre, busqueda, "categoria", this.route, this.router, this.publicacionServicio);

    if(nombre != undefined){
      this.categoriaActual = nombre;
    }

    this.publicacionServicio.setBusqueda('');
  }
  
  
  // Al igual que cuando cambio de pagina, esta metodo lo que hace es ejecutar la funcion llamada filtrosVarios y le paso 
  // como parametro "vendedor" esto construira la queryParams

  // As with when I change page, this method does is execute the function called filtrosVarios and I pass
  // as a parameter "seller" this will build the queryParams
  vendedorABuscar(nombre: string | undefined){
    let busqueda = nombre!=undefined?nombre.split(' ')[0]:''
    let obj: Params= {}
    let filtros : string[] = [] ;
    let parametros : string = "";


    filtrosVarios(obj, filtros, parametros, nombre, busqueda, "vendedor", this.route, this.router, this.publicacionServicio);

    this.tiendaActual = nombre?nombre:'';
    this.publicacionServicio.setBusqueda('');
  }

  // Cuando se hace click en el boton de limpiar busqueda se ejecuta este metodo que lo que hace es limpiar la busqueda actual
  // when you click on the clear search button this method is executed that what it does is clear the current search
  limpiarBusqueda(){

    this.router.navigate(
      ['/publicaciones']
    );

    this.publicacionServicio.cambiarURL("?page=0")
    this.publicacionServicio.setBusqueda('');

    
  }

 


}
