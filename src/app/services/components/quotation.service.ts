import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  idQuot:any='valor'

  constructor(private http:HttpClient) { 
    //this.idQuot
    //this.idQuot=localStorage.getItem('idQuot')
  }
  headers:HttpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  })

  //Obtiene el registro de cotizacion dado el id
  getQuotationById(idQuotation:any){
    const url=`${URL_SERVICE}/api/quotations/${idQuotation}`
    return this.http.get(url)
  }

  //Devuelve las cotizaciones en las que participa el proveedor (parametro de envio id de proveedor)
  getQuotationsBySupplierId(idSupplier:any){
    let url=`http://localhost:3000/api/answers?filter=[where][idSupplier]=${idSupplier}`
    return this.http.get(url)
  }

  //Guarda el id de cotizacion en el localstorage
  setIdQuot(iq:any){
    //this.idQuot=iq
    localStorage.setItem('idQuot', iq)
  }

  //devuelve el id de cotizacion del localstorage
  getIdQuotation(){
    return localStorage.getItem('idQuot')
  }

  //devuelve un observable que contiene el listado de answers a partir del envio de id de cotizacion
  getAnswersByIdQuot(idQuot:any){
    let url = `${URL_SERVICE}/api/quotations/${idQuot}/answers`
    return this.http.get(url)
  }
}
