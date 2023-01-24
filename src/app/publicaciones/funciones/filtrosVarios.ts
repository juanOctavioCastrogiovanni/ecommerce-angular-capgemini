import { PublicacionesService } from '../servicios/publicaciones.service';
import { Params } from '../Interfaces/params.interface';
import { ActivatedRoute, Router } from '@angular/router';


export function filtrosVarios(obj: Params, filtros: string[], parametros: string, nombre: string | undefined, busqueda: string, tipo: string, route: ActivatedRoute, router: Router, publicacionServicio: PublicacionesService) {


    route.queryParams.subscribe((params: { [x: string]: any; }) => {
      switch (tipo) {
        case "categoria":
          porFiltro(obj, filtros, nombre, busqueda, params, "category");

        break;
        case "vendedor":
          porFiltro(obj, filtros, nombre, busqueda, params, "seller");

        break;
        case "pagina":
          porFiltro(obj, filtros, nombre, busqueda, params, "page");

        break;
        case "busqueda":
          porFiltro(obj, filtros, nombre, busqueda, params, "search");

        break;
       
      }
      })

    parametros="?".concat(filtros.join('&'));


    router.navigate(
      ['/publicaciones'], 
      { queryParams: obj }
    );

    publicacionServicio.cambiarURL(parametros);

  }

  
  
  
  
  
  function porFiltro(obj: any, filtros: string[], nombre: string | undefined, busqueda: string, params: any, filtro: string) {

    for (const parametro in params) {
      if (parametro != filtro && parametro != "page" && parametro != "search") {

        obj[parametro] = params[parametro];
        filtros.push(parametro.concat("=", params[parametro]));

      } else if(parametro != filtro && parametro == "page"){

            obj[parametro] = "0";
            filtros.push(parametro.concat("=", "0")); 

        }  

      

    }


    if(nombre){
      obj[filtro] = busqueda;
      filtros.push(filtro.concat("=", busqueda));
    }

    
  }