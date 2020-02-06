import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
// import { Items } from "../Components/Contacts/ContactItem";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

interface formData {
  fullname: string;
  email: string;
  password: string;
}

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

function AuthState(props: any) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Register User
  const Register = async (data: formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users/register", data, config);
      console.log(res.data.data[0])
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data
      });
      console.log(error.response)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        Register
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
