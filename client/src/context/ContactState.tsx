import React, { useReducer } from "react";
import ContactContext from "./ContactContext";
// import ContactReducer from './ContactReducer'
import {
  add_contact,
  delete_contact,
  update_contact,
  set_alert,
  set_current,
  filter_contact,
  clear_contact,
  clear_filter
} from "./types";

function ContactState({greeting}: {greeting:string} ) {
     
return <div> hello {greeting}</div>;
}

export default ContactState;
