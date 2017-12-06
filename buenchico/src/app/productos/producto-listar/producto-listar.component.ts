import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UsuarioModel } from './../../models/UsuarioModel';
import { ProductoModel } from './../../models/ProductoModel';

import { LocalDBService } from './../../services/LocalDB.service';
import { ProductoService } from './../../services/Producto.service';

import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css']
})
export class ProductoListarComponent implements OnInit {

  private usuario:UsuarioModel;
  public productos:Array<ProductoModel>;

  private cargando:boolean = false;
	constructor(private router: Router, private LocalDBService:LocalDBService, private ProductoService:ProductoService,
    private MzToastService: MzToastService) { }

  ngOnInit() {
  	console.log("ProductoListarComponent");

    this.usuario = this.LocalDBService.obtenerUsuario();
    if(!this.usuario){
      console.error("No existe usuario");
    }

    this.productos = new Array<ProductoModel>();
    this.cargar();
  }

  cargar(){
    this.cargando = true;
    this.ProductoService.obtenerConUsuario(this.usuario).subscribe(
      data => {
        console.log(data);
        this.cargando = false;
        var datos:any = data as any;
        if(datos.result){
          this.productos = datos.productos;
          this.MzToastService.show(datos.mensajes,3000,"green");
        } else {
          console.log(datos.mensajes);
          this.MzToastService.show(datos.errores,3000,"red");
        }
      },
      error => {
        console.error(error);
        this.cargando = false;
        //var dataError = error.json();
        //console.error(dataError);
      });
  }

  irEditar(producto){
    console.log(producto);
    var ruta = 'producto/editar/'+producto.idproducto;
    this.router.navigate([ruta]);                      
  }

  eliminar(producto){
    console.log(producto);

    this.ProductoService.eliminar(producto).subscribe(
      data => {
        console.log(data);
        this.cargando = false;
        var datos:any = data as any;
        if(datos.result){
          this.cargar();
          this.MzToastService.show(datos.mensajes,3000,"green");
        } else {
          console.log(datos.mensajes);
          this.MzToastService.show(datos.errores,3000,"red");
        }
      },
      error => {
        console.error(error);
        this.cargando = false;
        //var dataError = error.json();
        //console.error(dataError);
      });

  }

}