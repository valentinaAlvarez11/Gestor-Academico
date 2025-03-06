import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { ListaDepartamentoComponent } from './departamento/lista-departamento.component';
import { NuevoDepartamentoComponent } from './departamento/nuevo-departamento.component';
import { EditarDepartamentoComponent } from './departamento/editar-departamento.component';
import { DetalleDepartamentoComponent } from './departamento/detalle-departamento.component';
import { ListaProfesorComponent } from './profesores/lista-profesor.component';
import { NuevoProfesorComponent } from './profesores/nuevo-profesor.component';
import { EditarProfesorComponent } from './profesores/editar-profesor.component';
import { DetalleProfesorComponent } from './profesores/detalle-profesor.component';
import { ListaCursoComponent } from './curso/lista-curso.component';
import { NuevoCursoComponent } from './curso/nuevo-curso.component';
import { EditarCursoComponent } from './curso/editar-curso.component';
import { DetalleCursoComponent } from './curso/detalle-curso.component';
import { ListaEstudianteComponent } from './estudiante/lista-estudiante.component';
import { NuevoEstudianteComponent } from './estudiante/nuevo-estudiante.component';
import { EditarEstudianteComponent } from './estudiante/editar-estudiante.component';
import { DetalleEstudianteComponent } from './estudiante/detalle-estudiante.component';
import { ListaMatriculaComponent } from './matricula/lista-matricula.component';
import { NuevoMatriculaComponent } from './matricula/nuevo-matricula.component';
import { EditarMatriculaComponent } from './matricula/editar-matricula.component';
import { DetalleMatriculaComponent } from './matricula/detalle-matricula.component';
import { ListaHorarioComponent } from './horario/lista-horario.component';
import { NuevoHorarioComponent } from './horario/nuevo-horario.component';
import { EditarHorarioComponent } from './horario/editar-horario.component';
import { DetalleHorarioComponent } from './horario/detalle-horario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    ListaProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    DetalleProductoComponent,
    ListaDepartamentoComponent,
    NuevoDepartamentoComponent,
    EditarDepartamentoComponent,
    DetalleDepartamentoComponent,
    ListaProfesorComponent,
    NuevoProfesorComponent,
    EditarProfesorComponent,
    DetalleProfesorComponent,
    ListaCursoComponent,
    NuevoCursoComponent,
    EditarCursoComponent,
    DetalleCursoComponent,
    ListaEstudianteComponent,
    NuevoEstudianteComponent,
    EditarEstudianteComponent,
    DetalleEstudianteComponent,
    ListaMatriculaComponent,
    NuevoMatriculaComponent,
    EditarMatriculaComponent,
    DetalleMatriculaComponent,
    ListaHorarioComponent,
    NuevoHorarioComponent,
    EditarHorarioComponent,
    DetalleHorarioComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
