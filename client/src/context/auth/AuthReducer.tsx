import React from 'react'
import {REGISTER_SUCCESS, REGISTER_FAIL} from '../types'

export interface Istate {
    token: string | null,
    isAunthenticated: null,
    loading: boolean,
    user:boolean | null ,
    error:boolean | null
}

function AuthReducer(state:Istate, action:any) {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
           token:'1'
        };
       
       
      default:
        return state;
    }
}

export default AuthReducer
