import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showConfirmDelete(fnConfirmar: Function, params: any) {
    const optionConfirm: OptionConfirm = {
      titulo: 'Confirmar eliminación',
      texto: '¿Seguro que desea eliminar el item seleccionado? No se podrá recuperar!',
      textoBotonConfirmar: 'Sí!',
      textoBotonCancelar: 'NO!',
      fnConfirmar,
      params
    }
    this.showConfirm(optionConfirm);
  }

  private showConfirm( options: OptionConfirm ) {
    Swal.fire({
      title: options.titulo || 'Confirmar',
      text: "¿Seguro que desea eliminar el item seleccionado? No se podrá recuperar!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí!',
      cancelButtonText: 'NO!'
    }).then((result) => {
      if (result.value) {
        options.fnConfirmar(options.params);
      }
    });
  }
}

interface OptionConfirm {
  titulo ?: string;
  texto ?: string;
  textoBotonConfirmar ?: string;
  textoBotonCancelar ?: string;
  fnCancelar ?: Function;
  fnConfirmar : Function;
  params: any;
}