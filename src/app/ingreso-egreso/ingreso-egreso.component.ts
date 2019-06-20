import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';
import { LoadingService } from '../shared/services/loading.service';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo: any;

  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor( public ingresoEgresoService: IngresoEgresoService,
               public loadingService: LoadingService,
               public store: Store<AppState>) {
    this.tipo = 'ingreso';
  }

  ngOnInit() {
    this.loadingSubs  = this.store.select('ui')
                            .subscribe( ui => this.cargando = ui.isLoading );
    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {

    this.loadingService.initLoading();

    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });

    console.log('ingresoEgreso', ingresoEgreso);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
        .then( () => {
          Swal.fire('Creando', ingresoEgreso.descripcion, 'success');
          this.forma.reset({
            monto: 0
          });
        }).catch( err => {
          console.log(err);
        }).finally( () => {
          this.loadingService.finishLoading();
        });
  }
}
