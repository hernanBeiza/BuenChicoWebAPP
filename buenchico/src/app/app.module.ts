import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import routes from './app.routes';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { ProductosModule } from './productos/productos.module';
import { MenuComponent } from './menu/menu.component';

import { LocalDBService } from './services/LocalDB.service';
import { UsuarioService } from './services/Usuario.service';

import { MzNavbarModule, MzSidenavModule, MzModalModule, MzModalService, MzToastService } from 'ng2-materialize';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
  	routes,
    HttpModule,
	  BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MzNavbarModule,
    MzSidenavModule,
    MzModalModule,
    ProductosModule
  ],
  providers: [MzModalService,MzToastService,LocalDBService,UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
