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
import { CompraModule } from './compra/compra.module';





@NgModule({
  declarations: [
    AppComponent
  ],
  // Importaciones de todos los modulos que se van a utilizar a lo largo de la aplicacion
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
