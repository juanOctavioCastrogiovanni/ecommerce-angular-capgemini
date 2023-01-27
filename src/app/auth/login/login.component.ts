import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../carritos/services/carrito.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: string = "";

  constructor(private loginServicio: AuthService, private router: Router) { }

  
  iniciarSecision(evento:any){
    evento.preventDefault();

    // Se ejecuta el observable que hace la validacion si existe el usuario y si corresponde esa contraseña
    // The observable that validates if the user exists and if the password corresponds is executed
    this.loginServicio.iniciarSesion(evento.target[0].value, evento.target[1].value).subscribe(r=> {
      // Si las credenciales son correctas se guardan sus datos en el local storage
      // If the credentials are correct, their data is stored in local storage
      const id = JSON.stringify(r.id); 
      const nombre = JSON.stringify(r.nombre);
      localStorage.setItem("clienteId", id);
      localStorage.setItem("cliente", nombre);
      // Cambia el color para los estilos del boton del header
      // Change the color for the styles of the header button
      this.loginServicio.cambiarColor("color: red");
      this.router.navigate(["/"]);
    }, e => {
      this.error = e.error;
    });    // this.router.navigate(["/"]);
  }
}
