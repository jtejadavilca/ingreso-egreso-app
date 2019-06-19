import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';
export const SET_ITEM = '[Ingreso Egreso] Set Items';
export const UNSET_ITEM = '[Ingreso Egreso] Unset Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEM;

    constructor( public items: IngresoEgreso[] ) { }
}
export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEM;
}

export type acciones = SetItemsAction | UnsetItemsAction;
