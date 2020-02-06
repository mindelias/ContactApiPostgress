import { set_alert, remove_alert } from '../types'

// interface Istate: {

//     (string | number)[] 
// }
    

function AlertReducer(state:(string)[] , action: any) {
  switch (action.type) {
    case set_alert:
      return [...state, action.payload];
    case remove_alert:
      return state.filter(alert => alert.id !== action.payload)

    default:
      return state;
  }
}

export default AlertReducer;


