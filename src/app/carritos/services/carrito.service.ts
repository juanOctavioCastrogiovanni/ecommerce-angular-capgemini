import { Injectable, EventEmitter, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../interfaces/carrito.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cantidadEnCarrito: number = 0;

  private load : any = document.querySelector('.load')
  private body : any = document.querySelector('body')

  cantidad: EventEmitter<number> = new EventEmitter();
  numeroIcono: EventEmitter<number> = new EventEmitter();

  constructor(private http:HttpClient) { }

  // Modifica la cantidad y emite el cambio a los componentes subscritos
  // Modifies the amount and emits the change to the subscribed components
  setCantidadEnCarrito(numero: number){
    this.cantidadEnCarrito = numero;
    this.numeroIcono.emit();
    
  }

  // obtengo la cantidad de productos en el carrito
  // I get the amount of products in the cart
  getCantidadCarrito(){
    return this.cantidadEnCarrito;
  }

  private url = 'https://tp-capgemini-licuadora-production.up.railway.app/carrito';

  // Instanciar el carrito hace una peticion por post y este devuelve un string que es el id del carrito nuevo vacio.
  // Instanciar el carrito hace una peticion por post y este devuelve un string que es el id del carrito nuevo vacio.
  instaciarCarrito(): Observable<string> {
    return this.http.post<string> (this.url, {});
  }

  private carrito: string = '';

  // Este metodo agrega una publicacion al carrito
  // This method adds a publication to the cart
  agregarAlCarrito(idCarrito: string,idPublicacion: number): Observable<string>{
      return this.http.post<string>(`${this.url}/${idCarrito}/publicacion/${idPublicacion}`, {});
  }
 
  // Ejecuto el metodo delete donde le paso el id del carro en cuestio y el id de la publicacion, sabemos que si existe
  // un publicacion unica, no la resta sino que directamente la elimina

  // Execute the delete method where I pass the id of the car in question and the id of the publication, we know that if there is
  restarItemAlCarrito(idCarrito: string,idPublicacion: number): Observable<string>{
      return this.http.delete<string>(`${this.url}/${idCarrito}/restar-publicacion/${idPublicacion}`, {});
  }

  // Metodo que llama el header para verificar cuantos productos hay en el carrito 
  // Method called by the header to verify how many products there are in the cart
  actualizarIconoCarrito(): Observable<Carrito>{
    if(localStorage.getItem("carrito")!=null){
      return this.http.get<Carrito>(`${this.url}/${localStorage.getItem("carrito")}`)
    }
     else {
      return this.http.get<Carrito>(`${this.url}/0`)
     }
  }

  // Trae el carrito con el id del cliente
  // Brings the cart with the id of the client
  traerCarrito(id: string): Observable<Carrito>{
    return this.http.get<Carrito>(`${this.url}/${id}`)
  }


  //Este metodo cambiar el estado del carrito 
  //This method changes the state of the cart
  sumarAlCarrito(id: number | undefined){
    
    // Si no existe el id o el carrito en el local storage, se instancia un carrito y se guarda en el local storage
    // If the id or the cart does not exist in the local storage, a cart is instantiated and saved in the local storage
    if( id != undefined && localStorage.getItem('carrito') == null ){
      this.load.style.display = 'block';
      this.body.style.opacity = '0.5';


      this.instaciarCarrito().subscribe( idCarrito => {
        // Guardo el id del carrito en el local storage 
        // I save the id of the cart in the local storage
        localStorage.setItem('carrito', idCarrito);

       
        
        this.agregarAlCarrito(idCarrito, id).subscribe(r=>{},e=> {
          // Si el codigo de status http es 201, se emite el evento cantidad para que se actualice el icono del carrito
          // If the http status code is 201, the quantity event is emitted so that the cart icon is updated
          if(e.status==201){
            this.cantidad.emit();
            // En el caso de que no sea asi salta una alerta con sweetAlert2 especificando el error que es devuelto por el backend
            // In the case that it is not so, an alert with sweetAlert2 is triggered specifying the error that is returned by the backend
          } else {
            this.load.style.display = 'none';
            this.body.style.opacity = '1';
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e.error,
            })

           }        
        });

      });

    // Si existe el id y el carrito en el local storage, se agrega el item al carrito
    // If the id and the cart exist in the local storage, the item is added to the cart
    } else if( localStorage.getItem("carrito") != null ){
      this.load.style.display = 'block';
       this.body.style.opacity = '0.5';
      
      const carritoEncontrado = localStorage.getItem("carrito")!;
      
      this.agregarAlCarrito( carritoEncontrado, id!).subscribe(r=>{},e=> {
        if(e.status==201){
          this.cantidad.emit();
        }else {
          this.load.style.display = 'none';
            this.body.style.opacity = '1';
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.error,
          })
        }
      });
    }
  }


  // Resta en uno del carrito, si hay uno solo directamente lo quita
  // Rests one from the cart, if there is only one, it removes it directly
  restarAlCarrito(id: number | undefined){
    // ejecuta la pantalla de carga
    // executes the loading screen
    this.load.style.display = 'block';
    this.body.style.opacity = '0.5';
    // Si esta logueado
    // If logged in
    if( localStorage.getItem("carrito") != null ){
      // Busco el carrito
      const carritoEncontrado = localStorage.getItem("carrito")!;

      // ejecuto el observable 
      // execute the observable

      this.restarItemAlCarrito( carritoEncontrado, id!).subscribe(r=>{},e=> {
        // Si lo pudo restar, emite el evento cantidad para que se actualice el icono del carrito
        // If it could be subtracted, the quantity event is emitted so that the cart icon is updated
        if(e.status==200){
          this.cantidad.emit();

        }
        
      });
    }
  }

  // Metodo que se acciona cuando el usuario decide eliminar ese producto del carrito con todas sus unidades
  // Method that is triggered when the user decides to delete that product from the cart with all its units
  eliminarItem(id: number | undefined, cantidad: number){
    // ejecuta la pantalla de carga 
    // executes the loading screen 
    this.load.style.display = 'block';
    this.body.style.opacity = '0.5';
    
      this.eliminar(id!).subscribe(r=>{},e=> {
        if(e.status==200){
          this.cantidad.emit();
          
        }
      });
    
  }

  // En este caso ejecuto el metodo delete que borra directamente el producto del carrito con todas sus unidades
  // In this case I execute the delete method that directly deletes the product from the cart with all its units
  eliminar(id: number): Observable<string>{  
    return this.http.delete<string>(`${this.url}/${localStorage.getItem("carrito")}/item/${id}`, {});
  }

  
  
}
