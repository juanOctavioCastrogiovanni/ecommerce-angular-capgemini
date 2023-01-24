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
    let urlModificada = 'http://localhost:8088/publicaciones';
    
    const load : any = document.querySelector('.load')
    const body : any = document.querySelector('body')
    body.style.opacity=".7"

    this.publicacionServicio.buscarPublicaciones(urlModificada).subscribe( resp => {
      this.publicacionesApi = resp;
      console.log(resp);


      load.style.display="none";
      body.style.opacity="1";
    });
  
    
    this.busqueda = "";
  }


  ngAfterViewInit(): void {
    const load : any = document.querySelector('.load')
    const body : any = document.querySelector('body')
    body.style.opacity=".7"

    this.publicacionServicio.busquedaEvento.subscribe(resp => {
      this.busqueda = this.publicacionServicio.getBusqueda();
    })

    this.publicacionServicio.cambio.subscribe((params) => {
      let urlModificada = 'http://localhost:8088/publicaciones';
      urlModificada = urlModificada.split('?')[0];
      console.log(urlModificada+params)
      this.llamarApi(urlModificada+params);
      
      
      load.style.display="none";
      body.style.opacity="1";
      
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
