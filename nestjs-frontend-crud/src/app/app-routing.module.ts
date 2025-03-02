import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { ListaDepartamentoComponent } from './departamento/lista-departamento.component';
import { DetalleDepartamentoComponent } from './departamento/detalle-departamento.component';
import { NuevoDepartamentoComponent } from './departamento/nuevo-departamento.component';
import { EditarDepartamentoComponent } from './departamento/editar-departamento.component';

const routes: Routes = [
  { path: '', component: ListaProductoComponent },
  { path: 'detalle/:id', component: DetalleProductoComponent },
  { path: 'nuevo', component: NuevoProductoComponent },
  { path: 'editar/:id', component: EditarProductoComponent },
  
  { path: 'departamento', component: ListaDepartamentoComponent },
  { path: 'detalle/:id', component: DetalleDepartamentoComponent },
  { path: 'nuevo', component: NuevoDepartamentoComponent },
  { path: 'editar/:id', component: EditarDepartamentoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
