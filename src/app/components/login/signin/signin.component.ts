import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService, ContactsService } from 'src/app/services/service.index';
import { FormControl, Validators } from '@angular/forms';
import { ContactInterface } from 'src/app/models/contact.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  remember:boolean=false
  hide:boolean=true
  //email = new FormControl('', [Validators.required, Validators.email]);
  email!:string
  contact!:ContactInterface

  constructor(
    private authService:AuthService,
    private contactService:ContactsService,
    private router:Router
    ) { 

    }
    // public user:UserInterface = {
    //   email : '',
    //   password : ''
    // }

  ngOnInit(): void {
    this.email=localStorage.getItem('email') || ''
    if(this.email.length > 0){
      this.remember=true
    }
  }

  // onLogin(){
  //   return this.authService
  //       .loginUser(this.user.email!, this.user.password!)
  //       .subscribe(
  //     data=>{
  //       this.authService.setUser(data.user)
  //       let token=data.id
  //       this.authService.getContactByUserId2(data.user.id).subscribe(
  //         res=>this.contactService.setContact(res)
  //         )
  //       this.authService.setToken(token)
  //       this.ruta.navigate(['/cot-principal'])
  //     }, 
  //     error=>console.log(error)
  //   )
  // }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'Debe ingresar un valor';
  //   }
  //   return this.email.hasError('email') ? 'Email no válido' : '';
  // }


  onLogin(formLogin:NgForm){

      if(formLogin.invalid){
        return ;
      }

      let user:UserInterface = {
        email:formLogin.value.email,
        password:formLogin.value.password
      }

      this.authService.login(user, formLogin.value.remember).subscribe(res=>
        {
          let user2:any=res
          let token=user2.id
          this.authService.setToken(token)
          this.contactService.getContactByUserId(user2.userId).subscribe(
            res=>{
              //this.contactService.setContact(res)
              let contact2:any=res
              this.contactService.getSupplierAssocContact(contact2.id).subscribe(res=>{
                contact2=res
                if(contact2.suppliers){
                  //console.log('Tiene proveedor')
                  //origin
                  //this.router.navigate(['/cot-principal'])
                  //1
                  //const ruta:any = "/cot-principal"
                  this.router.navigateByUrl("/cot-principal")

                  //2
                  // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                  //   this.router.navigateByUrl('/cot-principal').then();
                  // }); 
                  //3
                  //this.router.navigateByUrl('/pages/profile', { skipLocationChange: true });
                  //this.router.navigate(["/cot-principal"]);
                   //4
                  //  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                  //   this.router.navigate(['/cot-principal'])
                  // }); 
                }
                else{
                  // this.router.navigateByUrl('/cot-principal', { skipLocationChange: true });
                  // this.router.navigate(["/pages/profile"]);
                  this.router.navigateByUrl('/cot-principal', { skipLocationChange: true });
                  this.router.navigate(["/pages/profile"]);

                  //this.router.navigate(['/pages/profile'])
                }
                this.contactService.setContact(contact2)
              })
            }
          )
        })
  }
}
