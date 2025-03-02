import { Departamento } from './../models/departamento';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  departamentoURL = environment.departamentoURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Departamento[]> {
    return this.httpClient.get<Departamento[]>(`${this.departamentoURL}`);
  }

  public detail(id: number): Observable<Departamento> {
    return this.httpClient.get<Departamento>(`${this.departamentoURL}${id}`);
  }

  public save(departamento: Departamento): Observable<any> {
    return this.httpClient.post<any>(`${this.departamentoURL}`, departamento);
  }

  public update(id: number, departamento: Departamento): Observable<any> {
    return this.httpClient.put<any>(`${this.departamentoURL}${id}`, departamento);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.departamentoURL}${id}`);
  }
}