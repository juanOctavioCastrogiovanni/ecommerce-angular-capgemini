import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { Carrito, ProductoPersonalizado, TiposDePago } from '../interfaces/carrito.interface';
import { CarritoService } from '../services/carrito.service';
import { CompraDTO } from '../interfaces/compra.interface';
import { CompraService } from 'src/app/compra/compra.service';
import { Direccion } from '../../compra/interfaces/direccion.interface';
import { Cliente } from '../../compra/interfaces/cliente.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VirtualAction } from 'rxjs';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class FinalizarCompraComponent implements OnInit {
    carrito: Carrito | undefined;
    cantidadCarrito: number = 0;
    mediosDePago: TiposDePago[] | undefined;
    direccion: Direccion | undefined;
    cliente: Cliente | undefined;
    chequeoCliente: boolean = false;
    chequeoDireccion: boolean = false;
    chequeoPago: boolean = false;

    constructor(private carritoService: CarritoService, private compraService: CompraService, private router: Router) {
    }

    // Cuando comienza el ciclo de vida debo traer varias cosas a este componente para guardarlo 
    // en los atributos internos y por lo tanto renderizarlo en este componente html

    // when the life cycle begins, I must bring several things to this component to save it
    // in the internal attributes and therefore render it in this component html
    ngOnInit(): void {
      const url = window.location.href;

      const id = url.split('/')[4];

      // Traigo el carrito para ver el listado de items del carrito en la pantalla
      // I bring the cart to see the list of items in the cart on the screen
      this.carritoService.traerCarrito(id).subscribe((carrito) => {
        this.carrito = carrito;
        this.cantidadCarrito = carrito.items.reduce((acumulador, item) => acumulador + item.cantidad, 0);
        if(this.cantidadCarrito>0){
          this.mediosDePago = carrito.items[0].publicacion?.productoPersonalizado?.vendedor.tiposDePagos
        };
      })

      

      // En el caso de que este logueado el usuario
      // In the case that the user is logged in

      if(localStorage.getItem('clienteId') != null){
        this.compraService.traerCliente(parseInt(localStorage.getItem('clienteId')!)).subscribe((cliente) => {
          // Almaceno al cliente en el atributo cliente para poder renderizarlo en el html
          // I store the client in the client attribute to be able to render it in html
          this.cliente = cliente; 

          // defino el estado del chequeo del cliente en verdadero para mostrar algunos datos en el formulario
          // I define the state of the client check in true to show some data in the form
          this.chequeoCliente = true;
        });
        this.compraService.traerDireccion(parseInt(localStorage.getItem('clienteId')!)).subscribe((direccion) => {
          // Lo mismo hago con la direccion, almaceno la direccion del cliente para poder renderizarla en el html
          // I do the same with the address, I store the client's address to be able to render it in html
          this.direccion = direccion;
        });
      }{
        this.chequeoCliente = false;
      }

    }
    
    // Funcion que se ejecuta cuando se selecciona el radio button de cliente
    // Function that runs when the client radio button is selected
    deshabilitarDireccion(evento:any){
      this.chequeoDireccion = evento.target.checked? true : false;
    }
    
    // Si es efectivo lo asigna en true sino no
    cambiarEstadoPago(cambioDeRadio:any){
      this.chequeoPago = cambioDeRadio;
     }

    //  Cuando se envia el formulario de finalizar compra se ejecuta este metodo
    // When the final purchase form is sent, this method is executed
    guardar(datos: any){
      datos.preventDefault();

      // Primero creo un objeto vacio, este objeto tiene la misma forma que el 
      // DTO de post de venta del backend, por lo tanto lo voy a ir llenando con los datos del formulario

      // First I create an empty object, this object has the same shape as the
      // DTO of post of backend sale, so I am going to fill it with the form data
      let venta: any={
        pagoId: null,
         clienteId: null,
         nombreCliente: "",
         apellidoCliente: "",
         emailCliente: "",
         direccionId: null,
         calle: "",
         altura: "",
         piso: "",
         departamento: "",
         localidad: "",
         provincia: ""
      }
     
      // Se iterara los distintos target de la respuesta del evento del formulario, que tecnicamente esta hecho en objetos
      // It will iterate the different targets of the response of the form event, which is technically made in objects


      
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Desea continuar la compra?',
            text: "Se procesara el pago",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Si, por supuesto!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              for(let i=0; i<datos.target.length; i++){

                // El datos.target[i].name tendra distintos nombres dependiendo del input que este iterando, dependiendo de cada uno va a ir 
                // completando los atributos del objeto "venta" creado anteriormente.

                // The datos.target [i] .name will have different names depending on the input that is iterating, depending on each one it will go
                // completing the attributes of the "sale" object created earlier.
        
                
                switch(datos.target[i].name){
                  case 'pago':
                    if(datos.target[i].checked){
                      venta['pagoId'] = datos.target[i].value;
                    } 
                    break;
                  case 'direccion':
                    if(datos.target[i].checked){
                      this.chequeoDireccion = true;
                      venta['direccionId'] = datos.target[i].value;
                    }
                    break;
                  
                  // Esto se logra gracias a que el nombre de los inputs del formulario es igual al nombre de los atributos del DTO de venta del backend
                  // This is achieved thanks to the fact that the name of the form inputs is equal to the name of the attributes of the backend sale DTO
                    default: venta[datos.target[i].name] = datos.target[i].value;
                      break;         
                }
                
              }
        
              // En este caso me comunico con el servicio de compra y llamo a su metodo guardarCompra donde le paso el objeto que voy a enviar por post y el id del carrito
              // In this case I communicate with the purchase service and call its savePurchase method where I pass the object I am going to send by post and the id of the cart
              this.compraService.guardarCompra(venta,parseInt(localStorage.getItem('carrito')!)).subscribe(r => {},
                e=> {
                  // Si todo esta bien devuelvo el id de error lo almaceno en el localstorage 
                  // If everything is fine I return the error id I store it in the localstorage
                  if(e.status==201){
                    const idventa = e.error.text.split(" ")[5];
                    localStorage.setItem('idVenta', idventa);
                    // Instancio un nuevo carrito y el id de ese carrito lo almaceno en el localstorage
                    // I instantiate a new cart and the id of that cart I store it in the localstorage
                    this.carritoService.instaciarCarrito().subscribe(idNuevoCarrito => {
                        localStorage.setItem('carrito', idNuevoCarrito);
                        // Piso la cantidad del icono del carrito del header
                        // I overwrite the amount of the header cart icon
                        this.carritoService.setCantidadEnCarrito(0);
                        // Hago una redireccion a compra donde muestro el comprobante de compra con los items de las cosas vendidas
                        // I make a redirect to purchase where I show the purchase receipt with the items of the things sold
                        this.router.navigate(['compra']);
                    });
                  } else {
                    swalWithBootstrapButtons.fire(
                      'Error',
                      'No se pudo procesar la compra',
                      'error'
                    )
                  }
                });
              
            } 
          })



      
    }

}
