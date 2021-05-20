import { Action } from "@ngrx/store";
import { Account } from "src/app/shared/models/account.model";

export const CHANGE_USER = '[account] CHANGE_USER';
export const REMOVE_USER = '[account] REMOVE_USER';
export const UPDATE_BALANCE = '[account] UPDATE_BALANCE';
export const UPDATE_PLACINGBET = '[account] UPDATE_PLACINGBET';

export class changeUser implements Action {
    readonly type = CHANGE_USER;
    constructor(public payload: Account){}
}

export class removeUser implements Action {
    readonly type = REMOVE_USER;
}

export class updateBalance implements Action {
    readonly type = UPDATE_BALANCE;
    constructor(public payload: number){}
}

export class updateBetPlacingState implements Action {
    readonly type = UPDATE_PLACINGBET;
    constructor(public payload: boolean){}
}

export type accountActionTypes = 
    changeUser 
    | removeUser 
    | updateBalance
    | updateBetPlacingState;

