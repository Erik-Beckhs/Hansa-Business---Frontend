import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutUserComponent } from '../dialogs/logout-user/logout-user.component'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  user!:UserInterface
  token!:string

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private authService:AuthService,
    private router:Router,
    public dialog: MatDialog
    ) {}

  ngAfterViewInit():void {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  ngOnInit(): void {
    //this.token!=this.authService.getToken()
    /*if(typeof (this.token) == 'undefined'){
        this.router.navigate([''])
    }*/
    this.user=this.authService.getCurrentUser()
    //console.log(this.user)
  }

  openDialog() {
    this.dialog.open(LogoutUserComponent);
  }
}
