import React, { useReducer } from "react";
import uuid from  'uuid'
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
// import { Items } from "../Components/Contacts/ContactItem";

import { set_alert, remove_alert } from "../types";

const initialState: [] = [];

function AlertState(props: any) {
  const [state, dispatch] = useReducer(AlertReducer, initialState);
  // Set Alert
  const SetAlert = (msg: string, type: string, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: set_alert,
      payload: { msg, type, id }
    });
      setTimeout(() => dispatch({type:remove_alert, payload:id})
          
      , timeout);
    };
    
 
  return (
    <AlertContext.Provider
      value={{
              state,
          SetAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertState;
