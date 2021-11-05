import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http:HttpClient) { }

  getDocumentsAssocQuotation(idQuot:string){
    let url=`${URL_SERVICE}/api/quotations/${idQuot}/docsRequireds`;
    return this.http.get(url);
  }
}
