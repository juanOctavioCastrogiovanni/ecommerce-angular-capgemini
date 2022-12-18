import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { CarritosModule } from './carritos/carritos.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { AuthModule } from './auth/auth.module';
import { CompartidoModule } from './compartido/compartido.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ItemPagoComponent } from './compra/item-pago/item-pago.component';
import { CompraModule } from './compra/compra.module';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CompraModule,
    BrowserModule,
    AppRoutingModule,
    MatBadgeModule,
    MatIconModule,
    CarritosModule,
    PublicacionesModule,
    AuthModule,
    CompartidoModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
