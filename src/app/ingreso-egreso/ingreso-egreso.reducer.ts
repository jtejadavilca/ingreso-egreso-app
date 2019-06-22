import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

export interface AppState extends AppState {
    ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer (state= estadoInicial, action: fromIngresoEgreso.acciones) {
    switch (action.type) {
        case fromIngresoEgreso.SET_ITEM:
            return {
                items: [
                    ...action.items.map(item => {
                        return {
                            ...item
                        };
                    })
                ]
            };
        case fromIngresoEgreso.UNSET_ITEM:
            return {
                items: []
            };
        default:
            return state;
    }
}
