import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from './filtros/filtros.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PublicacionTarjetaComponent } from './publicaciones-tarjetas/publicacion-tarjeta/publicacion-tarjeta.component';
import { PublicacionesComponent } from './publicaciones.component';
import { PublicacionesTarjetasComponent } from './publicaciones-tarjetas/publicaciones-tarjetas.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FiltrosComponent,
    PublicacionComponent,
    PublicacionTarjetaComponent,
    PublicacionTarjetaComponent,
    PublicacionesComponent,
    PublicacionesTarjetasComponent,
    PublicacionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    PublicacionesComponent,
    PublicacionesTarjetasComponent,
    PublicacionComponent
  ]
})
export class PublicacionesModule { }
