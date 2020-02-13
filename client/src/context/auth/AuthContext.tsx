import { createContext } from "react";
import { Istate } from "./AuthReducer";

interface Iauth {
  state: Istate;
  Register: any;
  Login: any;
  loadUser: any;
  LogOut: any;
}

const authContext = createContext({} as Iauth);

export default authContext;
