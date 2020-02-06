import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
// import { Items } from "../Components/Contacts/ContactItem";
 
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED ,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

 
 

const initialState = {
    token: localStorage.getItem('token'),
    isAunthenticated: null,
    loading: true,
    user:null,
    error:null
    
};

// type Contact = {
//   id: string;
//   first_name: string;
//   last_name: string;
//   phone: string;
//   email: string;
//   company: string;
// };

// type props = {
//   contacts: Contact[];
// };

function AuthState(props: any) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

   
  return (
    <AuthContext.Provider
      value={{
        state
         
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
