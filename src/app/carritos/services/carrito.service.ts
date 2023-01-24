import { Injectable, EventEmitter, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../interfaces/carrito.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cantidadEnCarrito: number = 0;

  cantidad: EventEmitter<number> = new EventEmitter();

  constructor(private http:HttpClient) { }

  setCantidadEnCarrito(numero: number){
    this.cantidadEnCarrito = numero;
    this.cantidad.emit();
  }

  sumarCantidadEnCarrito(){
    this.cantidadEnCarrito++;
    this.cantidad.emit();
  }

  restarCantidadEnCarrito(){
    this.cantidadEnCarrito--;
    this.cantidad.emit();
  }

  restarProducto(cantidad: number){
    this.cantidadEnCarrito -= cantidad;
    this.cantidad.emit();
  
  }

  getCantidadCarrito(){
    return this.cantidadEnCarrito;
  }

  private url = 'http://localhost:8088/carrito';


  instaciarCarrito(): Observable<string> {
    return this.http.post<string> (this.url, {});
  }

  private carrito: string = '';

  agregarAlCarrito(idCarrito: string,idPublicacion: number): Observable<string>{
    
      return this.http.post<string>(`${this.url}/${idCarrito}/publicacion/${idPublicacion}`, {});
  }
 
  restarItemAlCarrito(idCarrito: string,idPublicacion: number): Observable<string>{
    
      return this.http.delete<string>(`${this.url}/${idCarrito}/restar-publicacion/${idPublicacion}`, {});
  }

  actualizarIconoCarrito(): Observable<Carrito>{
    if(localStorage.getItem("carrito")!=null){
      return this.http.get<Carrito>(`${this.url}/${localStorage.getItem("carrito")}`)
    }
     else {
      return this.http.get<Carrito>(`${this.url}/0`)
     }
  }

  traerCarrito(id: string): Observable<Carrito>{
    return this.http.get<Carrito>(`${this.url}/${id}`)
  }



  sumarAlCarrito(id: number | undefined){
    if( id != undefined && localStorage.getItem('carrito') == null ){
      this.instaciarCarrito().subscribe( idCarrito => {
        
        localStorage.setItem('carrito', idCarrito);
        
        this.agregarAlCarrito(idCarrito, id).subscribe(r=>{},e=> {
          if(e.status==201){
            this.sumarCantidadEnCarrito();
            this.cantidad.emit();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e.error,
            })
          }
        });

      });
    } else if( localStorage.getItem("carrito") != null ){
      
      const carritoEncontrado = localStorage.getItem("carrito")!;
      
      this.agregarAlCarrito( carritoEncontrado, id!).subscribe(r=>{},e=> {
        if(e.status==201){
          this.sumarCantidadEnCarrito();
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.error,
          })
        }
      });
      
    }
  }



  restarAlCarrito(id: number | undefined){
    if( localStorage.getItem("carrito") != null ){
      
      const carritoEncontrado = localStorage.getItem("carrito")!;
      
      this.restarItemAlCarrito( carritoEncontrado, id!).subscribe(r=>{},e=> {
        if(e.status==200){
          this.restarCantidadEnCarrito();
        }
      });
    }
  }

  
  eliminarItem(id: number | undefined, cantidad: number){
  
    
      this.eliminar(id!).subscribe(r=>{},e=> {
        if(e.status==200){
          this.restarProducto(cantidad);
          
        }
      });
    
  }

  eliminar(id: number): Observable<string>{  
    return this.http.delete<string>(`${this.url}/${localStorage.getItem("carrito")}/item/${id}`, {});
  }

  
  
}
