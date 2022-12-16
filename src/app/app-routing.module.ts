import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { LoginComponent } from './auth/login/login.component';
import { CarritoComponent } from './carritos/carrito/carrito.component';
import { CarritosComponent } from './carritos/carritos.component';
import { FinalizarCompraComponent } from './carritos/finalizar-compra/finalizar-compra.component';
import { CompraFinalizadaComponent } from './compra/compra-finalizada/compra-finalizada.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PublicacionComponent } from './publicaciones/publicacion/publicacion.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';

const routes: Routes = [
  
  {path: '', redirectTo: 'publicaciones', pathMatch: 'full'},
  {path: 'publicaciones',component: PublicacionesComponent},
  {path: 'publicaciones/:id',component: PublicacionComponent},
  {
    path: 'clientes',
    children: [
      {path: 'login', component: LoginComponent}, // login
      {path: ':id/carritos', component: CarritosComponent}, // carritos del usuario
      {path: '**',redirectTo: 'login'}] 
  },
  {
    path: 'carrito',
    children: [
      {path: ':id', component: CarritoComponent},//carrito activo
      {path: ':id/finalizar-compra', component: FinalizarCompraComponent}] 
  },
  {path: 'compra', component: CompraFinalizadaComponent},
  {path: '404',component: ErrorPageComponent},
  {path: '**',redirectTo: '404'}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }