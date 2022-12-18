import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../compra/interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  iniciarSesion(email: string, password: string): Observable<Cliente> {
   return this.http.post<Cliente>('http://localhost:8088/clientes/iniciar-sesion',{email,password});
  }
}
