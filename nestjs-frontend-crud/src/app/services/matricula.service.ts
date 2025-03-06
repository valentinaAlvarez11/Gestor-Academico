import { Matricula } from './../models/matricula';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  matriculaURL = environment.matriculaURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Matricula[]> {
    return this.httpClient.get<Matricula[]>(`${this.matriculaURL}`);
  }

  public detail(id: number): Observable<Matricula> {
    return this.httpClient.get<Matricula>(`${this.matriculaURL}${id}`);
  }

  public save(matricula: Matricula): Observable<any> {
    return this.httpClient.post<any>(`${this.matriculaURL}`, matricula);
  }

  public update(id: number, matricula: Matricula): Observable<any> {
    return this.httpClient.put<any>(`${this.matriculaURL}${id}`, matricula);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.matriculaURL}${id}`);
  }
}
