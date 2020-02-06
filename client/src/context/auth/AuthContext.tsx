import { createContext } from "react";
import { Istate } from './AuthReducer'
import { Interface } from "readline";

interface Iauth{
    state:Istate

}

const authContext = createContext({} as Iauth)


export default authContext