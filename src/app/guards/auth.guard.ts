import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/service.index';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router){
    
  }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    //const a=this.authService.getCurrentUser()
    //console.log('valor : '+a)
    let token=this.authService.getToken()
    if (token !== null) {
        console.log('Esta logueado');
        return true;
    }
    else{
      console.log('No esta logueado')
      this.router.navigate(['/']);
      return false;
    }
}
}
