import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  //Devuelve el producto dado su ID
  getProductById(idProd:string){
    let url = `${URL_SERVICE}/api/prodservices/${idProd}`
    return this.http.get(url)
  }
  
}
