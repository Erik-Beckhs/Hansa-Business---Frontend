import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

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
    const a=this.authService.getCurrentUser()
    //console.log('valor : '+a)
    if (a==null) {
        console.log('No estás logueado');
        this.router.navigate(['/']);
        return false;
    }

    return true;
}
}