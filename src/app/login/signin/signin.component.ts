import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
//import * as CryptoJS from 'crypto-js';
//import { AuthService } from 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide:boolean=true
  email = new FormControl('', [Validators.required, Validators.email]);
  /*username:string=''
  password:string=''
  users:any*/

  //passwordEncriptado:string=''
  //clave:string='12345'

  constructor(
    //private serviceLogin:LoginService,
    private authService:AuthService,
    private ruta:Router
    ) { 
      //this.encriptar;
      //this.users=serviceLogin.getLogin()
      //console.log(this.users)
    }
    public user:UserInterface = {
      email : '',
      password : ''
    }

  //este metodo entra en accion cuando se presiona el boton de inicio de sesion
  /*send(form: NgForm){
    //console.log(form.value.user)
    this.username=form.value.user
    this.password=form.value.pass
    this.verificar(this.username, this.password)
  }*/

  ngOnInit(): void {
  }

  onLogin(){
    return this.authService
        .loginUser(this.user.email!, this.user.password!)
        .subscribe(
      data=>{
        this.authService.setUser(data.user)
        let token=data.id
        this.authService.setToken(token)
        this.ruta.navigate(['/cot-principal'])
        //console.log(data)
      }, 
      error=>console.log(error)
    )
  }

  //devuelve los datos de la tabla users
 /* async cargaLogin(){
    this.users = await this.serviceLogin.getContacts().then(data=>{
      console.log(data)
      //this.users=data
    })*/
    /*this.serviceLogin.getLogin().subscribe(data=>  
      this.users=data
      //console.log(this.users)
    )*/
 // }
  /*encriptar(){
    this.passwordEncriptado=CryptoJS.AES.encrypt(this.password.trim(), this.clave.trim()).toString()
  }*/
  /*verificar(a:string, b:string){
    if(a.length && b.length>0){
      //console.log(a)
      //console.log(b)
      this.cargaLogin()
      let c:number=0
      console.log(this.users)
      debugger

      for(let i=0;i<this.users.length;i++){
        if(a==this.users[i].username && b==this.users[i].password){
          alert('Usuario existente')
        }
        else{
          c++
        }
        if(c==this.users.length){
          alert('El usuario no existe')
        }
      }
    }
    //verificar que no esten vacios los campos
    //usuario no existente
    //usuario existente
  }*/
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email no válido' : '';
  }
}
