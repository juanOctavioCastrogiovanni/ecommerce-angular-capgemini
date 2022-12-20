import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginacionPublicacion, Publicacion, Categoria } from '../Interfaces/publicacion.interface';


@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private pagina: string = '';
  private categoria: string = '';
  private vendedor: string = '';
  private busqueda: string = '';

  cambio: EventEmitter<string>= new EventEmitter<string>();
  
  
  public setCategoria(categoria: string){
    this.pagina = '0';
    this.categoria = categoria;
    this.cambio.emit();
    this.busqueda = '';
  }
  
  
  public setVendedor(vendedor: string){
    this.pagina = '0';
    this.vendedor = vendedor;
    this.cambio.emit();
    this.busqueda = '';
  }
  
  public setPagina(pagina: string){
    this.pagina = pagina;
    this.busqueda = '';
  }
  
  public setBusqueda(busqueda: string){
    this.pagina = '0';
    this.busqueda = busqueda;
    this.cambio.emit();
  }

  getBusqueda()
  {
    return this.busqueda;
  }

  private apiUrl = 'http://localhost:8088';

  constructor( private http: HttpClient) { }

  buscarPublicaciones(): Observable<PaginacionPublicacion> {
   
    const categoria =(this.categoria.length>0)? `category=${this.categoria}` : '';
    const pagina =(this.pagina.length>0) ?`page=${this.pagina}`: '';
    const vendedor =(this.vendedor.length>0)? `seller=${this.vendedor}`: '';
    const busqueda =(this.busqueda.length>0)? `search=${this.busqueda}` :  '';

    return this.http.get<PaginacionPublicacion>(`${this.apiUrl}/publicaciones`+`?${pagina}&${categoria}&${vendedor}&${busqueda}`);
  }

  buscarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  buscarVendedores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendedores`);
  }

  publicacionDetalle(id: string): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${this.apiUrl}/publicaciones/${id}`);
  }
}
