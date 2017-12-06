import { Component, OnInit } from '@angular/core';

import { environment } from './../environments/environment';

import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { LocalDBService } from './services/LocalDB.service';
import { UsuarioService } from './services/Usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	constructor(private router:Router, private UsuarioService:UsuarioService, private LocalDBService:LocalDBService){ }

  private mostrarMenu:boolean = false;
  
	ngOnInit(): void { 
		console.log(environment);
		this.iniciarVerificarSesion();
	}

		//Verifica la sesión del usuario en el servidor en cada cambio de página
  private iniciarVerificarSesion(): void {
      this.router.events.forEach((event) => {
        // NavigationEnd
        // NavigationCancel
        // NavigationError
        // RoutesRecognized
        if(event instanceof NavigationStart) {
          this.UsuarioService.session().subscribe(
            data => {            
              var datos:any = data as any;
              //console.info(datos);
              if(datos.result){
                this.mostrarMenu = true;
                if(this.router.url=="/login"){
                  this.router.navigate(['/producto/listar']);
                }
              } else {
                this.mostrarMenu = false;
                this.LocalDBService.borrarTodo();
                this.router.navigate(['/login']);
              }
            },
            error => {
              //console.error(error);
              this.mostrarMenu = false;
              this.LocalDBService.borrarTodo();
              this.router.navigate(['/login']);
          });
        }
      });
  }

}
