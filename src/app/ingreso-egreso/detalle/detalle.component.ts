import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../shared/loading.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = [];
  subscription: Subscription = new Subscription();
  constructor(private ingresoEgresoService: IngresoEgresoService,
              private loadingService: LoadingService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
              .subscribe( ingresoEgreso => {
                console.log('ingresoEgreso.items', ingresoEgreso.items);
                this.items = ingresoEgreso.items;
              });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  pedirConfirmacionEliminar(uid: string) {

  }

  borrarItem(uid: string) {
    this.loadingService.initLoading();
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
        .then( () =>{
          Swal.fire('Item eliminado', 'Se eliminó correctamente el elemento', 'success');
        }).catch( error => {
          Swal.fire('Error', 'Error al intentar eliminar el elemento', 'error');
        }).finally( () => {
          this.loadingService.finishLoading();
        });
  }
}
