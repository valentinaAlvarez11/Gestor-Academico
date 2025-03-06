import { Evaluacion } from './../models/evaluacion';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  evaluacionURL = environment.EvaluacionURL;     

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Evaluacion[]> {
    return this.httpClient.get<Evaluacion[]>(`${this.evaluacionURL}`);
  }

  public detail(id: number): Observable<Evaluacion> {
    return this.httpClient.get<Evaluacion>(`${this.evaluacionURL}${id}`);
  }

  public save(evaluacion: Evaluacion): Observable<any> {
    return this.httpClient.post<any>(`${this.evaluacionURL}`, evaluacion);
  }

  public update(id: number, evaluacion: Evaluacion): Observable<any> {
    return this.httpClient.put<any>(`${this.evaluacionURL}${id}`, evaluacion);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.evaluacionURL}${id}`);
  }
}
