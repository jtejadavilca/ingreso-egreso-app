import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../ui.accions';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor( private store: Store<AppState> ) { }

  initLoading() {
    this.store.dispatch(new ActivarLoadingAction());
  }

  finishLoading() {
    this.store.dispatch(new DesactivarLoadingAction());
  }
}
