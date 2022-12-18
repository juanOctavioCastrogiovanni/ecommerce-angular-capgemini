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

    this.idTicket = this.getRandomInt(1000000);
    
    console.log("idVenta",localStorage.getItem('idVenta'));

    this.compraServicio.compraFinalizada(localStorage.getItem('idVenta')).subscribe(resp => {
      console.log("respuesta",resp);
      this.venta = resp;
      this.fecha = resp?.fechaCreacion?.toString().split('T')[0];
      // console.log(this.venta.carrito?.items?[0].publicacion?.nombre);
    });
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

}
