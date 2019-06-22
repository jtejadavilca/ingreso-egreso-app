import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AppState } from '../../app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = [];
  cargando: boolean;
  ingresoEgresoSubs: Subscription = new Subscription();
  loadingSubs: Subscription = new Subscription();
  constructor(private ingresoEgresoService: IngresoEgresoService,
              private loadingService: LoadingService,
              private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.loadingSubs  = this.store.select('ui')
                            .subscribe( ui => this.cargando = ui.isLoading );
    this.ingresoEgresoSubs = this.store.select('ingresoEgreso')
              .subscribe( ingresoEgreso => {
                console.log('ingresoEgreso.items', ingresoEgreso.items);
                this.items = ingresoEgreso.items;
              });
  }
  ngOnDestroy() {
    this.ingresoEgresoSubs.unsubscribe();
    this.loadingSubs.unsubscribe();
  }

  pedirConfirmacionEliminar(item: IngresoEgreso) {
    console.log(this.loadingService);
    Swal.fire({
      title: `Confirmar: <br>Eliminar "${item.descripcion}"`,
      text: '¿Seguro que desea eliminar el item seleccionado? No se podrá recuperar!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí!',
      cancelButtonText: 'NO!'
    }).then((result) => {
      if (result.value) {
        this.borrarItem(item);
      }
    });
  }

  borrarItem(item: IngresoEgreso) {
    console.log('item', item);
    console.log('this.loadingService', this.loadingService);
    this.loadingService.initLoading();
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
        .then( () => {
          Swal.fire('Item eliminado', `Se eliminó correctamente el elemento <strong>${item.descripcion}</strong>`, 'success');
        }).catch( error => {
          Swal.fire('Error', 'Error al intentar eliminar el elemento', 'error');
          console.log('Error', error);
        }).finally( () => {
          this.loadingService.finishLoading();
        });
  }
}
