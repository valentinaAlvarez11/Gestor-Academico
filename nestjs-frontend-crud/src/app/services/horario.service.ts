import { Horario } from './../models/horario';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private baseUrl = 'http://localhost:8080/horarios/';

  constructor(private http: HttpClient) { }

  public lista(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}`);
  }

  public detail(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.baseUrl}${id}`);
  }

  public save(horario: Horario): Observable<any> {
    console.log('Sending request to save horario:', horario); // Log the request payload
    return this.http.post<any>(`${this.baseUrl}`, horario).pipe(
      tap(response => console.log('Response from save horario:', response)) // Log the response
    );
  }

  public update(id: number, horario: Horario): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${id}`, horario);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${id}`);
  }
}
