import { Account } from "src/app/shared/account.model";
import * as accountActions from './account.actions'

const currentState: Account = null;

export function accountReducer(state: Account = currentState, action: accountActions.accountActionTypes){

    switch(action.type){
        case accountActions.CHANGE_USER:
            return action.payload;            
        case accountActions.REMOVE_USER:
            return undefined;
        case accountActions.UPDATE_BALANCE:
            return {
                ...state,
                money: action.payload
            }

        default: 
            return state;  
    }
} 
