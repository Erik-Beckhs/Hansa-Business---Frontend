import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http:HttpClient) { }
  headers:HttpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  })

  getApplicantById(idApplicant:any){
    const url=`http://localhost:3000/api/applicants/${idApplicant}`
    return this.http.get<any>(url)
  }
}
