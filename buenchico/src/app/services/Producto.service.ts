import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Rx';

import { UsuarioModel } from './../models/UsuarioModel';
import { ProductoModel } from './../models/ProductoModel';

import { environment } from './../../environments/environment';

@Injectable()
export class ProductoService {

  constructor(private http: Http) { }
 
  public obtenerConUsuario(usuario:UsuarioModel): Observable<any[]>{
    console.info("Producto.service.ts: login();");
    var url = environment.API+"producto/usuario/"+usuario.idusuario;
    return this.http.get(url,this.getOptions()).map((res) => {
      //console.info(res);
      let body = res.json();
      console.log(body);
      var respuesta = {}
      if(body.result){
        var productos = new Array<ProductoModel>();
        for(let item of body.productos){
          var model = new ProductoModel(item.idproducto,item.idusuario,item.nombre,item.codigo,item.descripcion,item.valid);
          productos.push(model);
        }
        respuesta = {result:body.result,mensajes:body.mensajes,productos:productos}
      } else {
        respuesta = {result:body.result,errores:body.errores}
      }
      return respuesta;
      //return body || { };
    }).catch((error) =>{
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        //console.info(body);
        //const err = body.error || JSON.stringify(body);
        //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        return Observable.throw(body);
      } else {
        errMsg = error.message ? error.message : error.toString();
        //console.info(errMsg);
        return Observable.throw(errMsg);
      }
    });
  }

  public obtenerConID(model:ProductoModel): Observable<any[]>{
    console.info("Producto.service.ts: login();");
    var url = environment.API+"producto/"+model.idproducto;
    return this.http.get(url,this.getOptions()).map((res) => {
      //console.info(res);
      let body = res.json();
      console.log(body);
      var respuesta = {}
      if(body.result){
        var item = body.producto;
        var model = new ProductoModel(item.idproducto,item.idusuario,item.nombre,item.codigo,item.descripcion,item.valid);
        respuesta = {result:body.result,mensajes:body.mensajes,producto:model}
      } else {
        respuesta = {result:body.result,errores:body.errores}
      }
      return respuesta;
      //return body || { };
    }).catch((error) =>{
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        //console.info(body);
        //const err = body.error || JSON.stringify(body);
        //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        return Observable.throw(body);
      } else {
        errMsg = error.message ? error.message : error.toString();
        //console.info(errMsg);
        return Observable.throw(errMsg);
      }
    });
  }

  public guardar(usuario:UsuarioModel,producto:ProductoModel): Observable<any[]>{
    console.info("Producto.service.ts: session();");
    var url = environment.API+"producto";

    let formData = new FormData();
    formData.append("idusuario",usuario.idusuario.toString());
    formData.append("nombre",producto.nombre);
    formData.append("codigo",producto.codigo);
    formData.append("descripcion",producto.descripcion);

    return this.http.post(url,formData,this.getOptions()).map((res) => {
      //console.info(res);
      let body = res.json();
      console.info(body);
      var respuesta = {};
      if(body.result){
        respuesta = {result:body.result,mensajes:body.mensajes}
      } else {
        respuesta = {result:body.result,errores:body.errores}
      }
      return respuesta;
      //return body || { };
    }).catch((error) =>{
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        //console.info(body);
        //const err = body.error || JSON.stringify(body);
        //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        return Observable.throw(body);
      } else {
        errMsg = error.message ? error.message : error.toString();
        //console.info(errMsg);
        return Observable.throw(errMsg);
      }
    });
  }

  public editar(usuario:UsuarioModel,producto:ProductoModel): Observable<any[]>{
    console.info("Producto.service.ts: editar();");
    var url = environment.API+"producto/"+producto.idproducto.toString();

    let formData = new FormData();
    formData.append("idproducto",producto.idproducto.toString());
    formData.append("idusuario",usuario.idusuario.toString());
    formData.append("nombre",producto.nombre);
    formData.append("codigo",producto.codigo);
    formData.append("descripcion",producto.descripcion);
    formData.append("valid",producto.valid.toString());

    return this.http.put(url,formData,this.getOptions()).map((res) => {
      let body = res.json();
      console.info(body);
      var respuesta = {};
      if(body.result){
        respuesta = {result:body.result,mensajes:body.mensajes}
      } else {
        respuesta = {result:body.result,errores:body.errores}
      }
      return respuesta;
      //return body || { };
    }).catch((error) =>{
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        //console.info(body);
        //const err = body.error || JSON.stringify(body);
        //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        return Observable.throw(body);
      } else {
        errMsg = error.message ? error.message : error.toString();
        //console.info(errMsg);
        return Observable.throw(errMsg);
      }
    });
  }

  public eliminar(producto:ProductoModel): Observable<any[]>{
    console.info("Producto.service.ts: eliminar();");
    var url = environment.API+"producto/"+producto.idproducto;
    return this.http.delete(url,this.getOptions()).map((res) => {
      let body = res.json();
      console.info(body);
      var respuesta = {};
      if(body.result){
        respuesta = {result:body.result,mensajes:body.mensajes}
      } else {
        respuesta = {result:body.result,errores:body.errores}
      }
      return respuesta;
      //return body || { };
    }).catch((error) =>{
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        //console.info(body);
        //const err = body.error || JSON.stringify(body);
        //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        return Observable.throw(body);
      } else {
        errMsg = error.message ? error.message : error.toString();
        //console.info(errMsg);
        return Observable.throw(errMsg);
      }
    });
  }

  private getOptions(): RequestOptions{
    return new RequestOptions({headers:this.getHeader(),withCredentials: true });
  }

  private getHeader(): Headers {
    let headers = new Headers({});
    return headers;
  }

}