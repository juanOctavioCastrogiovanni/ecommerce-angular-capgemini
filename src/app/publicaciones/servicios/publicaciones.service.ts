import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginacionPublicacion, Publicacion, Categoria } from '../Interfaces/publicacion.interface';


@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  pagina: string = '';
  categoria: string = '';
  vendedor: string = '';
  busqueda: string = '';
  params: string = "";

  // este evento emitido es el que detecta el cambio de los queryparams y hace la peticion a la api
  // this event emitted is the one that detects the change of the queryparams and makes the request to the api
  cambio: EventEmitter<string>= new EventEmitter<string>();

  // Este es el evento que detecta una busqueda en el buscador y hace la peticion a la api
  // This is the event that detects a search in the search engine and makes the request to the api
  busquedaEvento: EventEmitter<string>= new EventEmitter<string>();
  
  // Este getter devuelve los parametros que se van a usar en la url
  // This getter returns the parameters that will be used in the url
  public getParams(){
    return this.params;
  }
  
  // Este ejecuta el evento cambio y le pasa los parametros que se van a usar en la url
  // This executes the change event and passes the parameters that will be used in the url
  public cambiarURL(params: string){
    this.pagina = '0';
    this.params = params
    this.cambio.emit(params);
    this.busqueda = '';
  }
  
  // Este ejecuta el evento busquedaEvento y le pasa los parametros que se van a usar en la url
  // This executes the busquedaEvento event and passes the parameters that will be used in the url
  public setBusqueda(busqueda: string){
    this.pagina = '0';
    this.busqueda = busqueda;
    this.busquedaEvento.emit();
  }

  getBusqueda()
  {
    return this.busqueda;
  }

  private apiUrl = 'https://tp-capgemini-licuadora-production.up.railway.app';

  constructor( private http: HttpClient) { }

  // devuelve observable de paginacion de publicaciones
  // returns observable of pagination of publications
  buscarPublicaciones(params: string): Observable<PaginacionPublicacion> {

    return this.http.get<PaginacionPublicacion>(params);

  }

  // Devuelve las categorias para los filtros
  // Returns the categories for the filters
  buscarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  // Devuelve los vendedores para los filtros
  // Returns the sellers for the filters
  buscarVendedores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendedores`);
  }

  // Devuelve una publicacion por id
  // Returns a publication by id
  publicacionDetalle(id: string): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${this.apiUrl}/publicaciones/${id}`);
  }
}
