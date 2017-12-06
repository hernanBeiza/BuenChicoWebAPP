import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoAgregarComponent } from './producto-agregar/producto-agregar.component';
import { ProductoEditarComponent } from './producto-editar/producto-editar.component';
import { ProductoListarComponent } from './producto-listar/producto-listar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductoService} from './../services/Producto.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[ProductoService],
  declarations: [ProductoAgregarComponent, ProductoEditarComponent, ProductoListarComponent]
})
export class ProductosModule { }
