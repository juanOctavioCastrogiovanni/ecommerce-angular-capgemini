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

  cambio: EventEmitter<string>= new EventEmitter<string>();
  busquedaEvento: EventEmitter<string>= new EventEmitter<string>();
  
  public getParams(){
    return this.params;
  }
  
  public cambiarURL(params: string){
    this.pagina = '0';
    // this.categoria = categoria!=''?`?category=${categoria}`:'';
    this.params = params
    this.cambio.emit(params);
    this.busqueda = '';
  }
  
  
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

  buscarPublicaciones(params: string): Observable<PaginacionPublicacion> {

    return this.http.get<PaginacionPublicacion>(params);

  }

  buscarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  buscarVendedores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendedores`);
  }

  publicacionDetalle(id: string): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${this.apiUrl}/publicaciones/${id} `);
  }
}
