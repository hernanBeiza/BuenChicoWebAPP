import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Mensajes } from './../libs/Mensajes';
import { Validaciones } from './../libs/Validaciones';

import { UsuarioModel } from './../models/UsuarioModel';

import { LocalDBService } from './../services/LocalDB.service';
import { UsuarioService } from './../services/Usuario.service';

import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  public usuario:AbstractControl;
  public contrasena:AbstractControl;

  private enviandoFlag:boolean = false;

  private usuarioModel:UsuarioModel = new UsuarioModel();

  // Errores
  private formErrors = {
    'usuario': '',
    'contrasena': ''
  };

  constructor(private router: Router, 
    private LocalDBService:LocalDBService, private UsuarioService: UsuarioService,
    private fb:FormBuilder,
    private MzToastService: MzToastService) { 

  }

  ngOnInit(): void { 

    this.loginForm = this.fb.group({
      'usuario': [this.usuarioModel.user, Validators.compose([Validators.required, Validators.minLength(1)])],
      'contrasena': [this.usuarioModel.pass, Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.usuario = this.loginForm.controls['usuario'];
    this.contrasena = this.loginForm.controls['contrasena'];

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now

    if(this.LocalDBService.obtenerUsuario()){
      console.log(this.LocalDBService.obtenerUsuario());
    }

  }

  public onSubmit(values:Object):void {

    if (this.loginForm.valid) {
      this.iniciarSesion();
    }

  }

  private iniciarSesion(): void {
  	this.enviandoFlag = true;
  	// Enviar información al backend
  	this.UsuarioService.login(this.usuarioModel).subscribe(
  		data => {
  		  //console.log(data);
  		  this.enviandoFlag = false;
  		  var datos:any = data as any;
  		  if(datos.result){
          this.usuarioModel = datos.usuario;
          this.MzToastService.show(datos.mensajes,3000);
          this.LocalDBService.guardarUsuario(this.usuarioModel);
  		    var ruta = 'producto/listar';
  		    this.router.navigate([ruta]);                      
  		  } else {
          this.MzToastService.show(datos.mensajes,3000);
          console.log(datos.mensajes);
  		  }
  		},
  		error => {
  		  console.error(error);
  		  this.enviandoFlag = false;
        this.MzToastService.show(error,3000);
  		  //var dataError = error.json();
  		  //console.error(dataError);
  		}
    );
  }

  private onValueChanged(data?: any) {
    this.formErrors = Validaciones.onValueChanged(data,this.loginForm,this.formErrors,Mensajes.validacionesLogin);    
  }

  ngOnDestroy() {
    console.info("LoginComponent: ngOnDestroy();");
  }


}
