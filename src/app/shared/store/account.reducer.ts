import { Account } from "src/app/shared/models/account.model";
import * as accountActions from './account.actions'

const currentState: Account = null;

export function accountReducer(state: Account = currentState, action: accountActions.accountActionTypes){

    switch(action.type){
        case accountActions.CHANGE_USER:
            return action.payload;            
        case accountActions.REMOVE_USER:
            return null;
        case accountActions.UPDATE_BALANCE:
            return {
                ...state, 
                balance: action.payload
            }
        case accountActions.UPDATE_PLACINGBET:
            return {
                ...state,
                placingBet: action.payload
            }

        default: 
            return state;  
    }
} 
