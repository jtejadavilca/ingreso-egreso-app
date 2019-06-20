import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../shared/services/loading.service';
import { AlertService } from '../../shared/services/alert.service';

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
              private alertService: AlertService,
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

  pedirConfirmacionEliminar(item: IngresoEgreso) {
    this.alertService.showConfirmDelete(this.borrarItem, item);
  }

  borrarItem(item: IngresoEgreso) {
    console.log('item', item);
    // this.loadingService.initLoading();
    // this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
    //     .then( () =>{
    //       Swal.fire('Item eliminado', 'Se eliminó correctamente el elemento', 'success');
    //     }).catch( error => {
    //       Swal.fire('Error', 'Error al intentar eliminar el elemento', 'error');
    //     }).finally( () => {
    //       this.loadingService.finishLoading();
    //     });
  }
}
