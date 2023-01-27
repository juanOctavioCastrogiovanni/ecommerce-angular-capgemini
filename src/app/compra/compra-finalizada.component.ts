import { Component, OnInit } from '@angular/core';
import { CompraService } from './compra.service';
import { Carrito, Venta } from './interfaces/venta.interface';

@Component({
  selector: 'app-compra-finalizada',
  templateUrl: './compra-finalizada.component.html',
})

export class CompraFinalizadaComponent implements OnInit{
  venta: Venta | undefined;
  fecha: string | undefined;
  idTicket: number | undefined;
  constructor(private compraServicio: CompraService) { }

  ngOnInit(): void {
    // Genera un numero random para mostrar el tiket al cliente, no queda almacenado en la db
    // Generates a random number to show the ticket to the client, it is not stored in the db
    this.idTicket = this.getRandomInt(1000000);
    
    // Lo que hago es buscar la venta que se creo en el carrito y mostrarla en la vista 
    // What I do is search for the sale that was created in the cart and show it in the view 
    this.compraServicio.compraFinalizada(localStorage.getItem('idVenta')).subscribe(resp => {
      this.venta = resp;
      this.fecha = resp?.fechaCreacion?.toString().split('T')[0];
    });
  }

  // Genera un numero random para mostrar el tiket al cliente, no queda almacenado en la db
  // Generates a random number to show the ticket to the client, it is not stored in the db
  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

}
