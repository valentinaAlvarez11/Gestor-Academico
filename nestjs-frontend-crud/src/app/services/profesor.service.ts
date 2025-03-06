import { Profesor } from './../models/profesor';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  profesorURL = environment.profesorURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Profesor[]> {
    return this.httpClient.get<Profesor[]>(`${this.profesorURL}`);
  }

  public detail(id: number): Observable<Profesor> {
    return this.httpClient.get<Profesor>(`${this.profesorURL}${id}`);
  }

  public save(profesor: Profesor): Observable<any> {
    return this.httpClient.post<any>(`${this.profesorURL}`, profesor);
  }

  public update(id: number, profesor: Profesor): Observable<any> {
    return this.httpClient.put<any>(`${this.profesorURL}${id}`, profesor);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.profesorURL}${id}`);
  }
}
