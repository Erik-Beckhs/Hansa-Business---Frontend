import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
//import { isNullOrUndefined } from 'util';

import { ContactInterface } from 'src/app/models/contact.interface';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { UserInterface } from 'src/app/models/user.interface';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //user!:any
  contact!:any
  token!:any

  constructor(private http:HttpClient) { 
    this.token=this.getToken()
    //console.log('token:'+this.token)
  }
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

  //Registro de usuarios
  registerUser(
    //email:string,
    //password:string
    user:UserInterface
  ){
    const url=URL_SERVICE+"/api/Users"
    return this.http.post(url, user)
  }

  registerSupplier(
    id:string,
    name:string,
    businessArea:string,
    country:string,
    idContact:string
  ){
    const url = "http://localhost:3000/api/suppliers";
    return this.http.post<SupplierInterface>(url, {
      id:id,
      name:name,
      businessArea:businessArea,
      country:country,
      idContact:idContact
    }, {
      headers:this.headers
    }).pipe(map(data => data));
  }

  setToken(token:any):void{
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
    } 
    else {
      return null!;
    }
  }

  // getContactByUserId(userId:any){
  //     const url = `http://localhost:3000/api/contacts/findOne?filter[where][idUser]=${userId}`;
  //     return this.contact=this.http.get(url);
  // }

 /* getBookById(id: string) {
    const url_api = `http://localhost:3000/api/books/${id}`;
    return (this.book = this.http.get(url_api));
  }*/
  
  // loginUser(email: string, password: string): Observable<any> {
  //   const url_api = "http://localhost:3000/api/Users/login?include=user";
  //   return this.http
  //     .post<UserInterface>(
  //       url_api,
  //       { email, password },
  //       { headers: this.headers }
  //     )
  //     .pipe(map(data => data));
  // }
  setEmail(email:any){
    localStorage.setItem('email', email)
  }

  login(user:UserInterface, remember:boolean=false){
    if(remember){
      this.setEmail(user.email)
      //localStorage.setItem('email', user.email!)
    }
    else{
      localStorage.removeItem('email')
    }

    const url = URL_SERVICE + '/api/Users/login?include=user'
    return this.http.post(url, user)
  }

  //metodo que elimina la data del localStorage
  logoutUser() {
    this.contact=null
    localStorage.removeItem("accessToken");
    localStorage.removeItem("contact");
    localStorage.removeItem("idQuot");
    //return this.http.post<UserInterface>(url_api, { headers: this.headers });
  }

  updateUser(id:any, user:any){
    let url=`${URL_SERVICE}/api/Users/${id}?access_token=${this.token}`
    return this.http.patch(url, user)
  }
}