import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { LoadingService } from '../shared/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(private afAuth: AngularFireAuth,
              private afDB: AngularFirestore,
              private router: Router,
              private store: Store<AppState>,
              private loadingService: LoadingService) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log('fbUser', fbUser);
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
            .subscribe( (usuarioObj: any) => {
              const newUser = new User(usuarioObj);
              this.store.dispatch(new SetUserAction(newUser));
              this.usuario = newUser;
            });
      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  isUserAuth() {
    return this.afAuth.authState
               .pipe(
                 map(fbUser => {
                   const isLoged = fbUser != null;
                   if ( !isLoged ) {
                    this.router.navigate(['/login']);
                   }
                   return isLoged;
                 })
               );
  }

  crearUsuario(nombre: string, email: string, password: string) {

    this.loadingService.initLoading();

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then( resp => {
        // console.log(resp);
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };
        this.afDB.doc(`${user.uid}/usuario`)
            .set(user)
            .then( () => this.router.navigate(['/']) );
      })
      .catch( error => {
        console.error(error);
        Swal.fire('Error en el login', error.message, 'error');
      }).finally(() => this.loadingService.finishLoading());
  }

  login(email: string, password: string) {

    this.loadingService.initLoading();

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then( user => {
        console.log(user);
        this.router.navigate(['/']);
      }).catch(error => {
        console.log(error);
        Swal.fire('Error en el login', error.message, 'error');
      }).finally(() => this.loadingService.finishLoading());
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  getUsuario() {
    return {...this.usuario};
  }
}
