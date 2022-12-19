import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PublicacionesService } from '../servicios/publicaciones.service';
import { PaginacionPublicacion, Categoria } from '../Interfaces/publicacion.interface';

@Component({
  selector: 'app-publicaciones-tarjetas',
  templateUrl: './publicaciones-tarjetas.component.html',
})
export class PublicacionesTarjetasComponent implements OnInit, AfterViewInit{

  publicacionesApi: PaginacionPublicacion | undefined;
  

  busqueda: string | undefined ;

  constructor(private publicacionServicio: PublicacionesService) { 
    
  }
  
  
  
  ngOnInit(): void {
    this.publicacionServicio.buscarPublicaciones().subscribe( resp => {
      this.publicacionesApi = resp;
    });
    
    this.busqueda = "";
    
  }


  ngAfterViewInit(): void {
    this.publicacionServicio.cambio.subscribe(() => {
      this.llamarApi();
      this.busqueda = this.publicacionServicio.getBusqueda();
    });
    this.publicacionServicio.setBusqueda('')
  }



  private llamarApi(){
    this.publicacionServicio.buscarPublicaciones().subscribe( resp => {
      this.publicacionesApi = resp; 
    });      
  }

  cambiarPagina(pagina:number | undefined){
    let pag = pagina!=undefined?pagina.toString(): '';
    this.publicacionServicio.setPagina(pag);

    this.llamarApi();
  }


    
}
