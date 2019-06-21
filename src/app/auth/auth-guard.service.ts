import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router'; // /src/utils/preactivation
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor( public authService: AuthService ) { }

  canActivate() {
    return this.authService.isUserAuth();
  }

  canLoad() {
    return this.authService.isUserAuth()
              .pipe(
                take(1)
              );
  }
}
