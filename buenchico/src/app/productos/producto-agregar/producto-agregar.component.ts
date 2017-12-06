import { Component, OnInit } from '@angular/core';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Mensajes } from './../../libs/Mensajes';
import { Validaciones } from './../../libs/Validaciones';

import { UsuarioModel } from './../../models/UsuarioModel';
import { ProductoModel } from './../../models/ProductoModel';


import { LocalDBService } from './../../services/LocalDB.service';
import { UsuarioService } from './../../services/Usuario.service';
import { ProductoService } from './../../services/Producto.service';

import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-producto-agregar',
  templateUrl: './producto-agregar.component.html',
  styleUrls: ['./producto-agregar.component.css']
})
export class ProductoAgregarComponent implements OnInit {

  public agregarForm:FormGroup;
  public nombre:AbstractControl;
  public codigo:AbstractControl;
  public descripcion:AbstractControl;

  // Errores
  private formErrors = {
    'nombre': '',
    'codigo': '',
    'descripcion': ''
  };

  private enviandoFlag:boolean = false;
  private productoModel:ProductoModel; 
  private usuarioModel:UsuarioModel; 

  constructor(private router: Router, 
    private LocalDBService:LocalDBService, 
    private UsuarioService: UsuarioService, 
    private ProductoService: ProductoService, 
    private fb:FormBuilder,
    private MzToastService:MzToastService) { 

  	this.productoModel = new ProductoModel();

  }

  ngOnInit(): void { 

    this.agregarForm = this.fb.group({
      'nombre': [this.productoModel.nombre, Validators.compose([Validators.required, Validators.minLength(1)])],
      'codigo': [this.productoModel.codigo, Validators.compose([Validators.required, Validators.minLength(1)])],
      'descripcion': [this.productoModel.descripcion, Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.nombre = this.agregarForm.controls['nombre'];
    this.codigo = this.agregarForm.controls['codigo'];
    this.descripcion = this.agregarForm.controls['descripcion'];

    this.agregarForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now

    if(this.LocalDBService.obtenerUsuario()){
    	this.usuarioModel = this.LocalDBService.obtenerUsuario();
    }

  }

  public onSubmit(values:Object):void {
    if (this.agregarForm.valid) {
      this.ProductoService.guardar(this.usuarioModel,this.productoModel).subscribe(
      data => {
        console.log(data);
        this.enviandoFlag = false;
        var datos:any = data as any;
        if(datos.result){
          this.productoModel = new ProductoModel();
          this.agregarForm.reset();
          this.MzToastService.show(datos.mensajes,3000,"green");
        } else {
          console.log(datos.mensajes);
          this.MzToastService.show(datos.mensajes,3000,"red");
        }
      },
      error => {
        console.error(error);
        this.enviandoFlag = false;
        this.MzToastService.show(error.errores,3000,"red");
        //var dataError = error.json();
        //console.error(dataError);
      });
    }
  }

  private onValueChanged(data?: any) {
    this.formErrors = Validaciones.onValueChanged(data,this.agregarForm,this.formErrors,Mensajes.validacionesProducto);    
  }

  ngOnDestroy() {
    console.info("LoginComponent: ngOnDestroy();");
  }

}
