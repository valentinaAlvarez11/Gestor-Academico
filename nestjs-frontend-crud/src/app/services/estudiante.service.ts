import { Estudiante } from './../models/estudiante';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  estudianteURL = environment.estudianteURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Estudiante[]> {
    return this.httpClient.get<Estudiante[]>(`${this.estudianteURL}`);
  }

  public detail(id: number): Observable<Estudiante> {
    return this.httpClient.get<Estudiante>(`${this.estudianteURL}${id}`);
  }

  public save(estudiante: Estudiante): Observable<any> {
    return this.httpClient.post<any>(`${this.estudianteURL}`, estudiante);
  }

  public update(id: number, estudiante: Estudiante): Observable<any> {
    return this.httpClient.put<any>(`${this.estudianteURL}${id}`, estudiante);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.estudianteURL}${id}`);
  }
}
