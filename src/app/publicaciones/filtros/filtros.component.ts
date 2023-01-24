import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Categoria } from '../Interfaces/publicacion.interface';
import {filtrosVarios} from '../funciones/filtrosVarios';

import { PublicacionesService } from '../servicios/publicaciones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  ngOnInit(): void {
    
      this.publicacionServicio.buscarCategorias().subscribe( resp => {
        this.categorias = resp;
      });

      this.publicacionServicio.buscarVendedores().subscribe( resp => {
        this.tiendas = resp;
      })
  }

  ngAfterViewInit(): void {
    this.publicacionServicio.busquedaEvento.subscribe(() => {
      this.busquedaActual = this.publicacionServicio.getBusqueda()
    });

    
  }

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
  
  vendedorABuscar(nombre: string | undefined){
    let busqueda = nombre!=undefined?nombre.split(' ')[0]:''
    let obj: Params= {}
    let filtros : string[] = [] ;
    let parametros : string = "";

    filtrosVarios(obj, filtros, parametros, nombre, busqueda, "vendedor", this.route, this.router, this.publicacionServicio);

    this.tiendaActual = nombre?nombre:'';
    this.publicacionServicio.setBusqueda('');
  }

  limpiarBusqueda(){

    this.router.navigate(
      ['/publicaciones']
    );

    this.publicacionServicio.cambiarURL("?page=0")
    this.publicacionServicio.setBusqueda('');

    
  }

 


}
