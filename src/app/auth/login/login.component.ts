import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../carritos/services/carrito.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private loginServicio: AuthService, private router: Router) { }
  
  iniciarSecision(evento:any){
    evento.preventDefault();
    console.log(evento.target[0].value,evento.target[1].value );
    this.loginServicio.iniciarSesion(evento.target[0].value, evento.target[1].value).subscribe(r=> {
      const id = JSON.stringify(r.id); 
      const respuesta = JSON.stringify(r);
      localStorage.setItem("cliente", respuesta);
      localStorage.setItem("clienteId", id);

      this.router.navigate(["/"]);
    });    // this.router.navigate(["/"]);
  }
}
