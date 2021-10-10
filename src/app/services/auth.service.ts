import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
//import { isNullOrUndefined } from 'util';
import { ContactInterface } from '../models/contact.interface';
import { UserInterface } from '../models/user.interface';
import { SupplierInterface } from '../models/supplier.interface';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  contact!: Observable<any>; 
  /*contact2:ContactInterface={
    id:'',
    first_name:'',
    last_name:''
  }*/

  constructor(private http:HttpClient) { }
  headers:HttpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  });
  
  registerContact(
    id:string,
    first_name:string, 
    last_name:string, 
    email:string,  
    phone:string, 
    country:string, 
    city:string,
    position:string,
    idUser:number
    ){
    const url = "http://localhost:3000/api/contacts";
    //const url= "http://localhost:3000/contacts";
    return this.http.post<ContactInterface>(url, {
      id:id,
      first_name:first_name,
      last_name:last_name,
      email:email,
      phone:phone,
      country:country,
      city:city,
      position:position,
      idUser:idUser
    }, {
      headers:this.headers
    }).pipe(map(data => data));
  }

  registerUser(
    email:string,
    password:string
  ){
    const url_api="http://localhost:3000/api/Users"
    return this.http.post<UserInterface>(url_api, {
      email:email,
      password:password
    }, {headers:this.headers})
    .pipe(map(data=>data))
  }

  registerSupplier(
    id:string,
    name:string,
    rubro:string,
    country:string,
    idContact:string
  ){
    const url = "http://localhost:3000/api/suppliers";
    return this.http.post<SupplierInterface>(url, {
      id:id,
      name:name,
      rubro:rubro,
      country:country,
      idContact:idContact
    }, {
      headers:this.headers
    }).pipe(map(data => data));
  }

  setToken(token:string):void{
    localStorage.setItem("accessToken", token);
  }

  getToken(){
    return localStorage.getItem("accessToken");
  }

  setUser(user:UserInterface):void{
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
    if (user_string) {
      let user: UserInterface = JSON.parse(user_string!);
      return user;
    } else {
      return null!;
    }
  }

  getContactByUserId(userId:any){
      const url_api = `http://localhost:3000/api/contacts/findOne?filter[where][idUser]=${userId}`;
      //return this.http.get(url_api).toPromise();
      return (this.contact=this.http.get(url_api));
  }

 /* getBookById(id: string) {
    const url_api = `http://localhost:3000/api/books/${id}`;
    return (this.book = this.http.get(url_api));
  }*/
  
  loginUser(email: string, password: string): Observable<any> {
    const url_api = "http://localhost:3000/api/Users/login?include=user";
    return this.http
      .post<UserInterface>(
        url_api,
        { email, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  logoutUser() {
    let access_Token = localStorage.getItem("accessToken");
    const url_api = `http://localhost:3000/api/Users/logout?access_token=${access_Token}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post<UserInterface>(url_api, { headers: this.headers });
  }
  
  updateContact(contact:ContactInterface) {
    // TODO: obtener token
    // TODO: not null
    const contactId = contact.id;
    //console.log('RESPUESTA DESDE SERVICE')
    //console.log(contact)
    const token = this.getToken();
    //console.log('token:' +token)
    //console.log('id: '+ contactId)
    const url_api = `http://localhost:3000/api/contacts/${contactId}?access_token=${token}`;
    return this.http
      .patch<ContactInterface>(url_api, contact, { headers: this.headers })
      .pipe(map(data => data));
  }
}