import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutUserComponent } from '../../pages/dialogs/logout-user/logout-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  estado:boolean=false;
  user:UserInterface={
    username:'',
    email:''
  }

  constructor(
    private authService:AuthService,
    private ruta:Router, 
    private dialog:MatDialog
    ) {
    
   }

  ngOnInit(): void {
    if(this.verificaUser()){
      this.user=this.authService.getCurrentUser();
      if(this.user.username==null){
        this.user.username='Unknown User'
      }
    }
  }

  hansaSupplier(){
    if(this.verificaUser()){
      this.ruta.navigate(['/cot-principal'])
    }
    else{
      this.ruta.navigate(['/'])
    }
  }

  verificaUser(){
    const a=this.authService.getCurrentUser()
    //console.log(a)
    if(a!=null){
      return true
    }
    else{
      return false
    }
  }
  logOut() {
    this.dialog.open(LogoutUserComponent);
  }
}

