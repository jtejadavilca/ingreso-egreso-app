import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { User } from '../../auth/user.model';
import { AuthState } from '../../auth/auth.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombreUsuario: string;

  subscription: Subscription = new Subscription();
  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null )
    ).subscribe( (auth: AuthState) => {
      console.log('auth', auth);
      this.nombreUsuario = auth.user.nombre;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
