import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { FinalizarCompraComponent } from './finalizar-compra/finalizar-compra.component';
import { CarritoTarjetaComponent } from './carrito-tarjeta/carrito-tarjeta.component';
import { CarritoItemComponent } from './carrito-item/carrito-item.component';
import { CarritosComponent } from './carritos.component';
import { RouterModule } from '@angular/router';




@NgModule({
    declarations: [
    CarritoComponent,
    FinalizarCompraComponent,
    CarritoTarjetaComponent,
    CarritoItemComponent,
    CarritosComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ], 
    exports: [
      CarritosComponent,
    ]
    
})
export class CarritosModule { }
