import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private authURL = environment.authURL;

  constructor(private http: HttpClient) {}

  public register(user: any): Observable<any> {
    return this.http.post<any>(`${this.authURL}/register`, user);
  }

  public login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.authURL}/login`, credentials);
  }

  public getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  public logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  }
}
