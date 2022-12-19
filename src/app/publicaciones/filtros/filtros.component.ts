import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Categoria } from '../Interfaces/publicacion.interface';
import { PublicacionesService } from '../servicios/publicaciones.service';

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


  constructor(private publicacionServicio:PublicacionesService) { }

  ngOnInit(): void {
    
      this.publicacionServicio.buscarCategorias().subscribe( resp => {
        this.categorias = resp;
      });

      this.publicacionServicio.buscarVendedores().subscribe( resp => {
        this.tiendas = resp;
      })
  }

  ngAfterViewInit(): void {
    this.publicacionServicio.cambio.subscribe(() => {
      this.busquedaActual = this.publicacionServicio.getBusqueda()
    });

    
  }

  categoriaABuscar(nombre: string | undefined){
    let busqueda = nombre!=undefined?nombre:''
    if(nombre != undefined){
      busqueda = busqueda.replace(' ','-');
      this.publicacionServicio.setCategoria(busqueda);
      this.categoriaActual = nombre;
    }
  }
  
  vendedorABuscar(nombre: string | undefined){
    let busqueda = nombre!=undefined?nombre:''
    if(nombre != undefined){
      busqueda = busqueda.split(' ')[0];
      this.publicacionServicio.setVendedor(busqueda);
      this.tiendaActual = nombre;
    }
  }

  limpiarBusqueda(){
    this.publicacionServicio.setBusqueda('');
  }
}
