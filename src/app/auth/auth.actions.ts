import { User } from './user.model';
import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] Unset User';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user: User) {}
}
export class UnsetUserAction implements Action {
    readonly type = UNSET_USER;

    constructor() {}
}

export type acciones = SetUserAction | UnsetUserAction;
