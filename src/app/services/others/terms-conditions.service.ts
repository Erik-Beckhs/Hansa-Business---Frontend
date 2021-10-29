import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class TermsConditionsService {

  constructor(private http:HttpClient) {

   }

   getTermsAndConditionsByIdQuotation(idQuot:string){
    const url = `${URL_SERVICE}/api/quotations/${idQuot}/termsConditions`
    return this.http.get(url)
   }
}
