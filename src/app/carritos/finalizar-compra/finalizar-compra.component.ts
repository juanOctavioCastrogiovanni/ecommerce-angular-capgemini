import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { Carrito, ProductoPersonalizado, TiposDePago } from '../interfaces/carrito.interface';
import { CarritoService } from '../services/carrito.service';
import { CompraDTO } from '../interfaces/compra.interface';
import { CompraService } from 'src/app/compra/compra.service';
import { Direccion } from '../../compra/interfaces/direccion.interface';
import { Cliente } from '../../compra/interfaces/cliente.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    chequeoEfectivo: boolean = false;

    constructor(private carritoService: CarritoService, private compraService: CompraService, private router: Router) {
    }

    ngOnInit(): void {
      const url = window.location.href;

      const id = url.split('/')[4];

      this.carritoService.traerCarrito(id).subscribe((carrito) => {
        this.carrito = carrito;
        this.cantidadCarrito = carrito.items.reduce((acumulador, item) => acumulador + item.cantidad, 0);
        if(this.cantidadCarrito>0){
          this.mediosDePago = carrito.items[0].publicacion?.productoPersonalizado?.vendedor.tiposDePagos
        };
      })

      

      if(localStorage.getItem('idCliente') != null){
        this.compraService.traerCliente(parseInt(localStorage.getItem('idCliente')!)).subscribe((cliente) => {
          this.cliente = cliente; 
        });
        this.compraService.traerDireccion(parseInt(localStorage.getItem('idCliente')!)).subscribe((direccion) => {
          this.direccion = direccion;
        });
      }

    }
    
    deshabilitarDireccion(evento:any){
      evento.target.checked? this.chequeoDireccion = true : this.chequeoDireccion = false;
    }

    deshabilitar(evento:any){
      evento.target.checked? this.chequeoCliente = true : this.chequeoCliente = false;
    }

    cambiarEstadoPago(cambioDeRadio:any){
      this.chequeoEfectivo = cambioDeRadio;
     }


    guardar(datos: any){
      datos.preventDefault();
     
      //  let idPago = datos.target.filter((element: any) => element.name == 'paymentMethod' && element.checked).value;
      //  console.log(idPago)



      let venta: CompraDTO={
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
      // for(let i=0; i<datos.target.length; i++){
      //     if(datos.target[i].name == 'pago' && datos.target[i].checked){
      //       idPago = datos.target[i].value;
      //     }
      //     if(datos.target[i].name == 'direccion' && datos.target[i].checked){
      //       direccionId = datos.target[i].value;
      //       this.chequeoDireccion = true;
      //     }
      //     if(datos.target[i].name == 'cliente' && datos.target[i].checked){
      //       clienteId = datos.target[i].value;
      //       this.chequeoCliente = true;
      //     }
      // }
      for(let i=0; i<datos.target.length; i++){
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
          case 'cliente':
            if(datos.target[i].checked){
              this.chequeoCliente = true;
              venta['clienteId'] = datos.target[i].value;
            }
            break;
          case 'nombreCliente':
            venta['nombreCliente'] = datos.target[i].value;
            break;
          case 'apellidoCliente':
            venta['apellidoCliente'] = datos.target[i].value;
            break;
          case 'emailCliente':
            venta['emailCliente'] = datos.target[i].value;
            break;
          case 'calle':
            venta['calle'] = datos.target[i].value;
            break;
          case 'altura':
            venta['altura'] = datos.target[i].value;
            break;
          case 'piso':
            venta['piso'] = datos.target[i].value;
            break;
          case 'departamento':
            venta['departamento'] = datos.target[i].value;
            break;
          case 'localidad':
            venta['localidad'] = datos.target[i].value;
            break;
          case 'provincia':
            venta['provincia'] = datos.target[i].value;
            break;          
        }

        
      }

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
          
          this.compraService.guardarCompra(venta,parseInt(localStorage.getItem('carrito')!)).subscribe(r => {},
            e=> {
              console.log(e);
              if(e.status=201){
                const idventa = e.error.text.split(" ")[5];
                localStorage.setItem('idVenta', idventa);
                this.carritoService.instaciarCarrito().subscribe(idNuevoCarrito => {
                    localStorage.setItem('carrito', idNuevoCarrito);
                    this.carritoService.setCantidadEnCarrito(0);
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
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Error',
            'No se pudo procesar la compra',
            'error'
          )
        }
      })



      
    }

}
