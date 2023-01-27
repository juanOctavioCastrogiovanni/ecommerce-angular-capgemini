import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { FinalizarCompraComponent } from './finalizar-compra/finalizar-compra.component';
import { CarritoTarjetaComponent } from './carrito-tarjeta/carrito-tarjeta.component';
import { CarritoItemComponent } from './carrito-item/carrito-item.component';
import { CarritosComponent } from './carritos.component';
import { RouterModule } from '@angular/router';
import { ItemSubcarritoComponent } from './finalizar-compra/item-subcarrito/item-subcarrito.component';
import { ItemPagoComponent } from './finalizar-compra/item-pago/item-pago.component';




@NgModule({
    // Todos los componentes que se van a utilizar dentro de carritosComponent y finalizarComponent
    declarations: [
    CarritoComponent,
    FinalizarCompraComponent,
    ItemPagoComponent,
    CarritoTarjetaComponent,
    CarritoItemComponent,
    CarritosComponent,
    ItemSubcarritoComponent
  ],
  // Importo routerModules para las redirecciones
    imports: [
        CommonModule,
        RouterModule
    ], 
    exports: [
      CarritosComponent,
      FinalizarCompraComponent
    ]
    
})
export class CarritosModule { }
