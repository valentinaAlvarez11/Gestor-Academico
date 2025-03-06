import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { ListaDepartamentoComponent } from './departamento/lista-departamento.component';
import { DetalleDepartamentoComponent } from './departamento/detalle-departamento.component';
import { NuevoDepartamentoComponent } from './departamento/nuevo-departamento.component';
import { EditarDepartamentoComponent } from './departamento/editar-departamento.component';
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
import { DetalleHorarioComponent } from './horario/detalle-horario.component';
import { EditarHorarioComponent } from './horario/editar-horario.component';

const routes: Routes = [
  // { path: '', redirectTo: '/productos', pathMatch: 'full' }, // Redirigir a 'productos' por defecto
  { path: 'detalle/:id', component: DetalleProductoComponent },
  { path: 'nuevo', component: NuevoProductoComponent },
  { path: 'editar/:id', component: EditarProductoComponent },
  { path: 'detalle-departamento/:id', component: DetalleDepartamentoComponent },
  { path: 'nuevo-departamento', component: NuevoDepartamentoComponent },
  { path: 'editar-departamento/:id', component: EditarDepartamentoComponent },
  { path: 'productos', component: ListaProductoComponent },
  { path: 'departamentos', component: ListaDepartamentoComponent },
  { path: 'profesores', component: ListaProfesorComponent },
  { path: 'nuevo-profesor', component: NuevoProfesorComponent },
  { path: 'editar-profesor/:id', component: EditarProfesorComponent },
  { path: 'detalle-profesor/:id', component: DetalleProfesorComponent },
  { path: 'cursos', component: ListaCursoComponent},
  { path: 'nuevo-curso', component: NuevoCursoComponent},
  { path: 'editar-curso/:id', component: EditarCursoComponent},
  { path: 'detalle-curso/:id', component: DetalleCursoComponent},
  { path: 'estudiantes', component: ListaEstudianteComponent},
  { path: 'nuevo-estudiante', component: NuevoEstudianteComponent},
  { path : 'editar-estudiante/:id', component: EditarEstudianteComponent},
  { path: 'detalle-estudiante/:id', component: DetalleEstudianteComponent},
  { path: 'matriculas', component: ListaMatriculaComponent},
  { path: 'nuevo-matricula', component: NuevoMatriculaComponent},
  { path: 'editar-matricula/:id', component: EditarMatriculaComponent},
  { path: 'detalle-matricula/:id', component: DetalleMatriculaComponent},
  { path: 'horarios', component: ListaHorarioComponent},
  { path: 'nuevo-horario', component: NuevoHorarioComponent},
  { path: 'detalle-horario/:id', component: DetalleHorarioComponent},
  { path: 'editar-horario/:id', component: EditarHorarioComponent}, 
  { path: '**', redirectTo: '/departamentos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
