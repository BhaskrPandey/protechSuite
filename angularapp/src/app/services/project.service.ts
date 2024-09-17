

import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
 
  apiUrl = 'https://8080-dfddcdcaaeeeeabbfadcbfcdbabdddcaeedccdbcafcaaba.premiumproject.examly.io';

  getProjectById(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/getProjectById/${id}`);
  }
 
  addProject(project: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/addProject`,project);
  }
 
  updateProject(id: string, project: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/updateProject/${id}`,project);
  }
 
  getAllProjects(): Observable<any>{
    return this.http.get(`${this.apiUrl}/getAllProject`);
  }
 
  deleteProject(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteProject/${id}`)
  }
 
}
 
