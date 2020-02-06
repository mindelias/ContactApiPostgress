import { createContext } from "react";
import { Istate } from './AuthReducer'
import { Interface } from "readline";

interface Iauth{
    state: Istate,
    Register:any

}

const authContext = createContext({} as Iauth)


export default authContext