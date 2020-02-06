import { set_alert, remove_alert } from "../types";

export interface Istate {
  id: string;
  msg: string;
  type: string;
}

function AlertReducer(state: Istate[], action: any) {
  switch (action.type) {
    case set_alert:
      return [...state, action.payload];
    case remove_alert:
      return state.filter(alert => alert.id !== action.payload);

    default:
      return state;
  }
}

export default AlertReducer;
