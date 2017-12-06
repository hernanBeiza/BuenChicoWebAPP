import { Component, OnInit } from '@angular/core';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { Mensajes } from './../../libs/Mensajes';
import { Validaciones } from './../../libs/Validaciones';

import { UsuarioModel } from './../../models/UsuarioModel';
import { ProductoModel } from './../../models/ProductoModel';


import { LocalDBService } from './../../services/LocalDB.service';
import { UsuarioService } from './../../services/Usuario.service';
import { ProductoService } from './../../services/Producto.service';

import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css']
})
export class ProductoEditarComponent implements OnInit {

  private subscription: Subscription;

  public editarForm:FormGroup;
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private LocalDBService:LocalDBService, 
    private UsuarioService: UsuarioService, 
    private ProductoService: ProductoService, 
    private fb:FormBuilder,
    private MzToastService: MzToastService) { 

  	this.productoModel = new ProductoModel();

  }

  ngOnInit(): void { 

    this.editarForm = this.fb.group({
      'nombre': [this.productoModel.nombre, Validators.compose([Validators.required, Validators.minLength(1)])],
      'codigo': [this.productoModel.codigo, Validators.compose([Validators.required, Validators.minLength(1)])],
      'descripcion': [this.productoModel.descripcion, Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.nombre = this.editarForm.controls['nombre'];
    this.codigo = this.editarForm.controls['codigo'];
    this.descripcion = this.editarForm.controls['descripcion'];

    this.editarForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now

    if(this.LocalDBService.obtenerUsuario()){
    	this.usuarioModel = this.LocalDBService.obtenerUsuario();
    }

    this.cargarProducto();
  }

  private cargarProducto(): void {
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        let idproducto = param['idproducto'];
        if(idproducto != undefined || idproducto == "undefined"){
            this.productoModel.idproducto = idproducto;
            this.ProductoService.obtenerConID(this.productoModel).subscribe(
              data => {
                var datos:any = data as any;
                console.log(datos);
                if(datos.result){
                  this.productoModel = datos.producto;
                  this.MzToastService.show(datos.mensajes,3000);
                } else {
                  this.MzToastService.show(datos.errores,3000,"red");
                }
              },
              error => {
                console.log(error);
              }
            );           
        }
      }
    );
  }

  public onSubmit(values:Object):void {
    if (this.editarForm.valid) {
      this.ProductoService.editar(this.usuarioModel,this.productoModel).subscribe(
      data => {
        console.log(data);
        this.enviandoFlag = false;
        var datos:any = data as any;
        if(datos.result){                    
          this.MzToastService.show(datos.mensajes,3000,"green");
        } else {
          console.log(datos.mensajes);
          this.MzToastService.show(datos.errores,3000,"red");
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
    this.formErrors = Validaciones.onValueChanged(data,this.editarForm,this.formErrors,Mensajes.validacionesProducto);    
  }

  ngOnDestroy() {
    console.info("ProductoEditarComponent: ngOnDestroy();");
    this.subscription.unsubscribe();
  }

}
