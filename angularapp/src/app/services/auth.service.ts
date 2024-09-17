import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  private token : string |null = null;
  private userRole = new BehaviorSubject<string | null >(null);
  private userId = new BehaviorSubject<string | null >(null);


  baseUrl = 'https://8080-dfddcdcaaeeeeabbfadcbfcdbabdddcaeedccdbcafcaaba.premiumproject.examly.io/user';

  register(user: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, login).pipe(
      tap((response: any) => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
        localStorage.setItem("role", response.role);
        this.userRole.next(response.role);
        this.userId.next(response.id);
      })
    ); 
  }
 
  getRole(){
    return localStorage.getItem("role");
  }
 
  logout(){
    sessionStorage.clear();
  }
 
  isAuthenticated(){
    return this.getRole() !== null;
  }
 
  isUser(){
    return this.getRole() === "user";
  }
 
  isAdmin(){
    return this.getRole() === "admin";
  }

  
}
