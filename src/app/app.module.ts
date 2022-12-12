import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './compartido/menu/menu.component';
import { BusquedaComponent } from './compartido/busqueda/busqueda.component';
import { CarritoIconoComponent } from './compartido/carrito-icono/carrito-icono.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritosComponent } from './carritos/carritos.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BusquedaComponent,
    CarritoIconoComponent,
    ProductosComponent,
    CarritosComponent,
    AuthComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
