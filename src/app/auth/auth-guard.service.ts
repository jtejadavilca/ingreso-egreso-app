import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'; // /src/utils/preactivation
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( public authService: AuthService ) { }

  canActivate() {
    return this.authService.isUserAuth();
  }
}
