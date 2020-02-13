import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
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
type loginData = Pick<formData, "email" | "password">;

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

function AuthState(props: any) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  // Load user

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/users/login");
      console.log(res.data.data[0]);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response
      });
      console.log(error.response);
    }
  };

  // Register User
  const Register = async (data: formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users/register", data, config);
      console.log(res.data.data[0]);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.error
      });
      console.log(error.response);
    }
  };

  // Login User
  const Login = async (data: loginData) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users/login", data, config);
      console.log(res.data.data[0]);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data
      });
      console.log(error.response);
    }
  };
  // logout User
  const LogOut = async () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        Register,
        Login,
        loadUser,
        LogOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
