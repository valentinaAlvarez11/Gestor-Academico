import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from './../services/profesor.service';

@Component({
  selector: 'app-detalle-profesor',
  templateUrl: './detalle-profesor.component.html',
  styleUrls: ['./detalle-profesor.component.css']
})
export class DetalleProfesorComponent implements OnInit {
  id: number;
  profesor: any;

  constructor(
    private route: ActivatedRoute,
    private profesorService: ProfesorService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.profesorService.detail(this.id).subscribe(data => {
      this.profesor = data;
    });
  }
}
