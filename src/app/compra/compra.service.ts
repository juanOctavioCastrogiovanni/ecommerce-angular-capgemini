import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Direccion } from './interfaces/direccion.interface';
import { Observable } from 'rxjs';
import { Cliente } from './interfaces/cliente.interface';
import { CompraDTO } from '../carritos/interfaces/compra.interface';
import { Venta } from './interfaces/venta.interface';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  traerDireccion(idCliente: number): Observable<Direccion>{
    return this.http.get<Direccion>(`https://tp-capgemini-licuadora-production.up.railway.app/clientes/${idCliente}/direccion`);
  }

  traerCliente(idCliente: number): Observable<Cliente>{
    return this.http.get<Cliente>(`https://tp-capgemini-licuadora-production.up.railway.app/clientes/${idCliente}`);
  }

  guardarCompra(venta: CompraDTO, carritoId:number|undefined): Observable<string>{
    return this.http.post<string>(`https://tp-capgemini-licuadora-production.up.railway.app/carrito/${carritoId}/venta`, venta);
  }

  compraFinalizada(id: any): Observable<Venta>{
    return this.http.get<Venta>(`https://tp-capgemini-licuadora-production.up.railway.app/ventas/${id}`);
  }
}
