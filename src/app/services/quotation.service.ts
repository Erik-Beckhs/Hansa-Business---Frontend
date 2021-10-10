import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuotationInterface } from '../models/quotation.interface';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(private http:HttpClient) { }
  headers:HttpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  })

  getQuotationsRelByIdSupplier(idSupplier:any){
    const url=`http://localhost:3000/api/quot-supps?filter=[where][idSupplier]=${idSupplier}`
    return this.http.get<any>(url).toPromise()
  }
  getQuotationById(idQ:string){
    const url=`http://localhost:3000/api/quotations/${idQ}`
    return this.http.get<any>(url)
  }
}
