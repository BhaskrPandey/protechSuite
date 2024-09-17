
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectProposalService {
  
  apiUrl = 'https://8080-dfddcdcaaeeeeabbfadcbfcdbabdddcaeedccdbcafcaaba.premiumproject.examly.io';

  constructor(private http : HttpClient) { }
 
  getAllProposals(): Observable<any>{
    return this.http.get(`${this.apiUrl}/viewProjectProposal`);
  }

  updateProposal(id: string, requestObject: any):  Observable<any>{
    console.log("testing update application (id):",id);
    return this.http.put(`${this.apiUrl}/updateProposal/${id}`,requestObject);
  }
 
  getProposalById(userId: string): Observable<any>{
    console.log('userid',userId)
    return this.http.get(`${this.apiUrl}/getProposalById/${userId}`)
  }
 
  addProposal(application: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/addProjectProposal`,application)
  }
  deleteProposal(proposalId: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteProposal/${proposalId}`)
  }

  updateProposalStatus(id: string, proposalData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateStatus/${id}`, proposalData);
  }
 
}