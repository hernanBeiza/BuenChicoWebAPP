import { ModuleWithProviders } from "@angular/core";

import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductoAgregarComponent } from './productos/producto-agregar/producto-agregar.component';
import { ProductoEditarComponent } from './productos/producto-editar/producto-editar.component';
import { ProductoListarComponent } from './productos/producto-listar/producto-listar.component';
 
// Route Configuration
const routes:Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'producto/listar', component: ProductoListarComponent },
	{ path: 'producto/agregar', component: ProductoAgregarComponent },
	{ path: 'producto/editar/:idproducto', component: ProductoEditarComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
];

const routing: ModuleWithProviders = RouterModule.forRoot(routes);

export default routing;