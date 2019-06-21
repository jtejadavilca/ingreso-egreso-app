import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthState } from '../../auth/auth.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombreUsuario: string;

  subscription: Subscription = new Subscription();
  constructor(public authService: AuthService,
              private store: Store<AppState>) { }

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

  cerrarSesion() {
    this.authService.logout();
  }
}
