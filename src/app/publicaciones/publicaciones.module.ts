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
  // Importar todos los componentes que se van a utilizar en el componente principal de este path (publicaciones)
  

  declarations: [
    FiltrosComponent,
    PublicacionComponent,
    PublicacionTarjetaComponent,
    PublicacionTarjetaComponent,
    PublicacionesComponent,
    PublicacionesTarjetasComponent,
    PublicacionComponent
  ],
  // Importo routerModules para las redirecciones, queryParams, y para poder utilizar el HttpClient
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  // Exporto solo los componentes que se van a mandar a app.modules.ts, en este caso son los filtros, las tarjetas y el detalle de cada producto
  exports: [
    PublicacionesComponent,
    PublicacionesTarjetasComponent,
    PublicacionComponent
  ]
})
export class PublicacionesModule { }
