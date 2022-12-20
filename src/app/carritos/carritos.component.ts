import { Component, OnInit } from '@angular/core';
import { Carrito, Venta } from '../compra/interfaces/venta.interface';
import { CarritoService } from './services/carrito.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.component.html',
})
export class CarritosComponent implements OnInit {
  carritos: Venta[] | undefined;
  
  constructor(private loginServicio: AuthService) { }
  ngOnInit() {
    if (localStorage.getItem('cliente') !== null) {
      const id = localStorage.getItem('clienteId')!;
      this.loginServicio.obtenerCarritos(id).subscribe(resp => {
        this.carritos = resp;
      })
    }
  }


}
