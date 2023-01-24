import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PublicacionesService } from '../servicios/publicaciones.service';
import { PaginacionPublicacion, Categoria } from '../Interfaces/publicacion.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filtrosVarios } from '../funciones/filtrosVarios';


@Component({
  selector: 'app-publicaciones-tarjetas',
  templateUrl: './publicaciones-tarjetas.component.html',
})
export class PublicacionesTarjetasComponent implements OnInit, AfterViewInit{

  publicacionesApi: PaginacionPublicacion | undefined;
  

  busqueda: string = '' ;

  constructor(private publicacionServicio: PublicacionesService, private router: Router, private route: ActivatedRoute) { 
    
  }
  
  
  
  ngOnInit(): void {
    let urlModificada = 'https://tp-capgemini-licuadora-production.up.railway.app/publicaciones';
    this.publicacionServicio.buscarPublicaciones(urlModificada).subscribe( resp => {
      this.publicacionesApi = resp;
      console.log(resp)
    });
  
    
    this.busqueda = "";
  }


  ngAfterViewInit(): void {
    this.publicacionServicio.busquedaEvento.subscribe(resp => {
      this.busqueda = this.publicacionServicio.getBusqueda();
    })

    this.publicacionServicio.cambio.subscribe((params) => {
      let urlModificada = 'https://tp-capgemini-licuadora-production.up.railway.app/publicaciones';
      urlModificada = urlModificada.split('?')[0];
      console.log(urlModificada+params)
      this.llamarApi(urlModificada+params);
      
    });
    // this.publicacionServicio.setBusqueda('')
  }



  private llamarApi(urlModificada: string){
    this.publicacionServicio.buscarPublicaciones(urlModificada).subscribe( resp => {
      this.publicacionesApi = resp; 
      console.log(this.publicacionServicio.getParams())
    });      
  }

  cambiarPagina(pagina:number | undefined){
    
    let pag = pagina!=undefined?pagina.toString(): '';
    let obj: Params= {}
    let filtros : string[] = [] ;
    let parametros : string = "";

    filtrosVarios(obj, filtros, parametros, pag, pag, "pagina", this.route, this.router, this.publicacionServicio);
    // this.publicacionServicio.setPagina(pag);

    // this.llamarApi();
  }


    
}
