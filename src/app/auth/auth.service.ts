import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../compra/interfaces/cliente.interface';
import { Carrito } from '../compra/interfaces/venta.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  @Output() sesion :EventEmitter<string> = new EventEmitter();

  iniciarSesion(email: string, password: string): Observable<Cliente> {
   return this.http.post<Cliente>('https://tp-capgemini-licuadora-production.up.railway.app/clientes/iniciar-sesion',{email,password});
  }

  cambiarColor(color:string){
    this.sesion.emit(color);
  }

  obtenerCarritos(id: string): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`https://tp-capgemini-licuadora-production.up.railway.app/clientes/${id}/carritos`);
  }
}
