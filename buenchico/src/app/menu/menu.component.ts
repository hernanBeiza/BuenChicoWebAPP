import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalDBService } from './../services/LocalDB.service';
import { UsuarioService } from './../services/Usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input('mostrarme') mostrarme: boolean = false;

	constructor(private router:Router,private LocalDBService:LocalDBService, private UsuarioService:UsuarioService) { }

  ngOnInit() { }

  cerrarSesion(){
  	console.log("cerrarSesion");
    this.UsuarioService.logout().subscribe(
      data => {            
        var datos:any = data as any;
      	//console.info(datos);
        this.LocalDBService.borrarTodo();
      	this.mostrarme = false;
        this.router.navigate(['/login']);

      },
      error => {
        console.error(error);
        this.LocalDBService.borrarTodo();
      	this.mostrarme = false;
        this.router.navigate(['/login']);

    });
  }

}
