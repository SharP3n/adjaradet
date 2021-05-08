import { Account } from "src/app/shared/account.model";
import * as accountActions from './account.actions'

initialState: Account;

export function accountReducer(state: Account, action: accountActions.accountActionTypes){
    switch(action.type){
        case accountActions.CHANGE_USER:
            return action.payload;
        case accountActions.REMOVE_USER:
            return undefined;
        default: 
            return state;  
    }
} 