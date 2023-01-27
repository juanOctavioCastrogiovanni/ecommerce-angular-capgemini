import { PublicacionesService } from '../servicios/publicaciones.service';
import { Params } from '../Interfaces/params.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';

// Esta funcion lo que hace es a partir de un tipo de filtro, el nombre del filtro y la busqueda construlle el objeto de parametros para la ruta 
// y los parametros para la url, y luego redirecciona a la ruta de publicaciones con los parametros correspondientes

// This function builds the route parameters object and the url parameters from a filter type, the filter name and the search, 
// and then redirects to the publications route with the corresponding parameters

export function filtrosVarios(obj: Params, filtros: string[], parametros: string, nombre: string | undefined, busqueda: string, tipo: string, route: ActivatedRoute, router: Router, publicacionServicio: PublicacionesService) {

  // Leo el queryParam de la ruta actual depende el tipo le paso por parametro el nombre del parametro que quiero leer
  // I read the queryParam of the current route depending on the type I pass the name of the parameter I want to read by parameter
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
          //solo en este caso nombre es distinto a undefined y busqueda distinto a " "
          // just in this case name is different from undefined and search different from " "
          porFiltro(obj, filtros, nombre, busqueda, params, "search");

        break;
       
      }
      })

    //Al terminar la funcion anterior, automaticamente obj y filtros ya tienen cosas por ende puedo contruir el queryparams
    // After the previous function ends, obj and filters automatically have things so I can build the queryparams
    parametros="?".concat(filtros.join('&'));
    


    router.navigate(
      ['/publicaciones'], 
      { queryParams: obj }
    );

    // Este metodo permite cambiar el atributo interno del servicio params y pasarlo en el evento emiter llamado cambio. 
    // This method allows you to change the internal attribute of the params service and pass it in the emiter event called change.
    publicacionServicio.cambiarURL(parametros);

  }

  
  
  
  // Esta funcion lo que hace es modificar el parametro OBJ que se encuentra vacio, lo modifica
  //  por referencia y no por valor

  // This function modifies the empty parameter OBJ, it modifies it by reference and not by value
  

  function porFiltro(obj: any, filtros: string[], nombre: string | undefined, busqueda: string, params: any, filtro: string) {

    // Recorro todos los atributos del objeto params y pregunta si ese parametro es diferente al filtro
    // I got through all the attributes of the params object and ask if that parameter is different from the filter
    
    for (const parametro in params) {
      if (parametro != filtro && parametro != "page" && parametro != "search") {

        // aparte pregunta si es diferente a page y a search, si es asi significa que
        // se creara un atributo con el nombre del atributo del params y tambien guardara su valor
        // {seller=magic, category=pijamas} 

        // in addition, it asks if it is different from page and search, if so it means that
        // an attribute with the name of the attribute of params will be created and also save its value
        // {seller=magic, category=pijamas}

        
        obj[parametro] = params[parametro];
        // paso siguiente se agregara al arreglo filtros el nombre del parametro y su valor
        // next step the parameter name and its value will be added to the filters array
        
        // ["seller=magic", "category=pijamas"]
        filtros.push(parametro.concat("=", params[parametro]));

        // Pero que pasa si el fistro es un filtro de busqueda
        // But what happens if the filter is a search filter
      } else if(parametro != filtro && parametro == "page"){

        // Si es un filtro de busqueda, la pagina la coloca en 0
        // If it is a search filter, the page is placed in 0
            obj[parametro] = "0";
            filtros.push(parametro.concat("=", "0")); 

        }  
  }

  // Si existe un nombre de busqueda entonces crea {search=busquda} y ["search=busqueda"]
  // If there is a search name then create {search=busquda} and ["search=busqueda"]
  
    if(nombre){
      obj[filtro] = busqueda;
      filtros.push(filtro.concat("=", busqueda));
    }

    
  }