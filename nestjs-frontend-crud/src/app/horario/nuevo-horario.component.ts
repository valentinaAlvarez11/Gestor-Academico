import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioService } from './../services/horario.service';
import { Horario } from '../models/horario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-horario',
  templateUrl: './nuevo-horario.component.html',
  styleUrls: ['./nuevo-horario.component.css']
})
export class NuevoHorarioComponent implements OnInit {
  dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  horaInicio: string;
  horaFin: string;

  constructor(
    private horarioService: HorarioService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onCreate(): void {
    const horario = new Horario(0, this.dia, this.horaInicio, this.horaFin);
    console.log('Creating horario:', horario); // Log the request payload
    this.horarioService.save(horario).subscribe(
      data => {
        Swal.fire('Horario creado', 'El horario ha sido creado con éxito', 'success');
        this.router.navigate(['/horarios']);
      },
      err => {
        console.error('Error creating horario:', err);
        Swal.fire('Error', 'Hubo un problema al crear el horario', 'error');
      }
    );
  }

  volver(): void {
    this.router.navigate(['/horarios']);
  }
}
