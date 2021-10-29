import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { Observable } from 'rxjs';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  // rubros:any[]=[
  //   {codigo:'A0', name:	'AGRIC-PECUA-Y-AGROIN'},
  //   {codigo:'B0', name:	'ARTESANIA, MYPES'},
  //   {codigo:'C0', name:	'COMERCIO E IMPORTAC'},
  //   {codigo:'C001', name:	'TAT'},
  //   {codigo:'C002', name:	'AASS'},
  //   {codigo:'C003', name:	'Farmacias'},
  //   {codigo:'C004', name:	'Tradicional'},
  //   {codigo:'C005', name:	'Otro'},
  //   {codigo:'C006', name:	'Instituciones'},
  //   {codigo:'C007', name:	'Canales Alternativos'},
  //   {codigo:'D0', name:	'CONST-URBAN Y EQUIP'},
  //   {codigo:'E0', name:	'EDUC-CULTU. Y CIENC'},
  //   {codigo:'F0', name:	'EXPORT. Y COM. EXT.'},
  //   {codigo:'G0', name:	'FINANZ., VAL. Y SEG.'},
  //   {codigo:'H0', name:	'HIDROC-MINE. Y ENERG'},
  //   {codigo:'I0', name:	'INDUSTRIA Y MANUFAC.'},
  //   {codigo:'J0', name:	'INST-ENTID. Y ORGAN'},
  //   {codigo:'K0', name:	'PUBLIC-COMUNIC-IMPR'},
  // ]

  constructor(
    private http:HttpClient,
    private authService:AuthService
    ) { }
  headers:HttpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  });

  getSupplierByContactId(contactId:any){
    const url_api = `http://localhost:3000/api/suppliers?filter[where][idContact]=${contactId}`;
    return this.http.get(url_api).toPromise();
  }

  //devuelve el proveedor dado su id y las cotizaciones en las que participa
  getQuotationsByIdSupplier(idSupplier:any){
    const url=`${URL_SERVICE}/api/suppliers?filter={"where": {"and": [{"id": "${idSupplier}"}]}, "include":"answers"}`
    return this.http.get(url)
  }

  updateSupplier(supplier:SupplierInterface) {
    // TODO: obtener token
    // TODO: not null
    const supplierId = supplier.id;
    //console.log('RESPUESTA DESDE SERVICE')
    //console.log(contact)
    const token = this.authService.getToken();
    //console.log('token:' +token)
    //console.log('id: '+ contactId)
    const url_api = `http://localhost:3000/api/suppliers/${supplierId}?access_token=${token}`;
    return this.http
      .patch<SupplierInterface>(url_api, supplier, { headers: this.headers })
      .pipe(map(data => data));
  }

  // getRubros(){
  //   return this.rubros
  // }

  getSupplierByIdContact(idContact:any):Observable<any>{
    const url=`http://localhost:3000/api/contacts/${idContact}/suppliers`
    return this.http.get<any>(url);
  }
}
