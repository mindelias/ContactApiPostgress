import React from "react";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

export interface Istate {
  token: string;
  isAuthenticated: boolean | null;
  loading: boolean;
  user:any;
  error: string | null;
}

function AuthReducer(state: Istate, action: any) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.data[0]
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.data[0].token);
      // console.log(action.payload.token, "verfy token")
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data[0].token);
      // console.log(action.payload.data[0].token, "verfy token");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: false
      };

    default:
      return state;
  }
}

export default AuthReducer;
