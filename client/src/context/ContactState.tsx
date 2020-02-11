import React, { useReducer } from "react";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import { Items } from "../Components/Contacts/ContactItem";
// import ContactReducer from './ContactReducer'
import {
  add_contact,
  delete_contact,
  update_contact,
  set_alert,
  set_current,
  filter_contact,
  clear_filter,
  clear_current
} from "./types";

import Contact from "../Components/Contact";

// type AppProps = {
//   contacts: [];
// };

const initialState = {
  contacts: [
    {
      id: "1e069db5-c15d-4d1c-8924-93254ddc394c",
      first_name: "Abila",
      last_name: "Adams",
      phone: "0816458970",
      email: "southwest@gmail.com",
      company: "Teragon"
    },
    {
      id: "e8371e87-0869-414d-b5fb-2437b56cb1b3",
      first_name: "Abilu",
      last_name: "hadeson",
      phone: "0816458970",
      email: "south@gmail.com",
      company: "Teragon"
    },
    {
      id: "03f96519-6b7b-4f42-8c64-00c26e77f4fe",
      first_name: "Terry",
      last_name: "Silver",
      phone: "0816459070",
      email: "terry@gmail.com",
      company: "Alison and co"
    }
  ],
  current: null,
  filter: null
};

// type Contact = {
//   id: string;
//   first_name: string;
//   last_name: string;
//   phone: string;
//   email: string;
//   company: string;
// };

// type props = {
//   contacts: Contact[];
// };

function ContactState(props: any) {
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact
  const addContact = (Contact: Items) => {
    dispatch({
      type: add_contact,
      payload: Contact
    });
  };
  // Delete Contact
  const deleteContact = (id: string) => {
    dispatch({
      type: delete_contact,
      payload: id
    });
  };
  // set Current
  const SetCurrent = (Contact: Items) => {
    dispatch({
      type: set_current,
      payload: Contact
    });
  };
  // update contact
  const updateContact = (Contact: Items) => {
    dispatch({
      type: update_contact,
      payload: Contact
    });
  };

  // clear Current
  const clearCurrent = () => {
    dispatch({ type: clear_current });
  };

  // Filter contact
  const filterContact = (text:any) => {
    dispatch({
      type: filter_contact,
      payload: text
    });
  };
  // clear Current
  const clearFilter = () => {
    dispatch({ type: clear_filter });
  };

  return (
    <ContactContext.Provider
      value={{
        state,
        addContact,
        deleteContact,
        SetCurrent,
        clearCurrent,
        updateContact,
        filterContact, 
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactState;
