import React from "react";
import {add_contact, delete_contact, set_alert,set_current, clear_current, filter_contact, clear_contact,clear_filter,update_contact} from './types'
 
export interface Istate {
  contacts: any[],
  current:any
}

function ContactReducer(state: Istate, action: any) {
  switch (action.type) {
    case add_contact:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case update_contact:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id? action.payload: contact)
      };
    case delete_contact:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact: any) => contact.id !== action.payload
        )
      };
    case set_current:
      return {
        ...state,
        current: action.payload
      };
    case clear_current:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
}

export default ContactReducer;
