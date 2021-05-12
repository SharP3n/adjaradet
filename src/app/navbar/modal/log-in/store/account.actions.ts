import { Action } from "@ngrx/store";
import { Account } from "src/app/shared/account.model";

export const CHANGE_USER = 'CHANGE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_BALANCE = 'UPDATE_BALANCE';
export const GET_USER = 'GET_USER';

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

export type accountActionTypes = changeUser | removeUser | updateBalance;

