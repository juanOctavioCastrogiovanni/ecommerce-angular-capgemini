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
    this.loginServicio.iniciarSesion(evento.target[0].value, evento.target[1].value).subscribe(r=> {
      const id = JSON.stringify(r.id); 
      const nombre = JSON.stringify(r.nombre);
      localStorage.setItem("clienteId", id);
      localStorage.setItem("cliente", nombre);
      this.loginServicio.cambiarColor("color: red");
      this.router.navigate(["/"]);
    }, e => {
      this.error = e.error;
    });    // this.router.navigate(["/"]);
  }
}
