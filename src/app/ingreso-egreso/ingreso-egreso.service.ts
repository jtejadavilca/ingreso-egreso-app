import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubs: Subscription = new Subscription();
  ingresoEgresoItemsSubs: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore,
               private authService: AuthService,
               private store: Store<AppState> ) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubs = this.store.select('auth')
        .pipe(
          filter( auth => auth.user != null)
        )
        .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }

  ingresoEgresoItems( uid: string ) {
    this.ingresoEgresoItemsSubs = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
             .snapshotChanges()
             .pipe(
               map( docData => {
                 return docData.map(doc => {
                   return {
                     uid: doc.payload.doc.id,
                     ...doc.payload.doc.data()
                   };
                 });
               })
             )
             .subscribe( (coleccion: any[]) => {
               this.store.dispatch( new SetItemsAction(coleccion) );
             });
  }

  cancelarSubscription() {
    this.ingresoEgresoItemsSubs.unsubscribe();
    this.ingresoEgresoListenerSubs.unsubscribe();
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
        .collection('items').add({...ingresoEgreso});
  }
}
