import React, { useReducer } from "react";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import { Items } from "../Components/Contacts/ContactItem";
import axios from "axios";
import { Icontact } from "./ContactContext";
// import ContactReducer from './ContactReducer'
import {
  GET_CONTACTS,
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
  contacts: null,
  current: null,
  filter: null,
  loading: false
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

function ContactState(props: React.PropsWithChildren<unknown>) {
  const [state, dispatch] = useReducer(ContactReducer, initialState);
  // Get Contacts
  const getContact = async () => {
    try {
      const res = await axios.get("api/contacts");
      console.log(res.data.data);
      dispatch({
        type: GET_CONTACTS,
        payload: res.data.data
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // Add Contact
  const addContact = async (Contact: Items) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("api/contacts", Contact, config);
      console.log(res.data.data);
      dispatch({
        type: add_contact,
        payload: res.data.data
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  // Delete Contact
  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`api/contact/${id}`);
      dispatch({
        type: delete_contact,
        payload: id
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  // set Current
  const SetCurrent = (Contact: Items) => {
    dispatch({
      type: set_current,
      payload: Contact
    });
  };
  // update contact
  const updateContact = async (Contact: Items) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.patch(`api/contact/${Contact.id}`, Contact, config);
       dispatch({
         type: update_contact,
         payload: res.data.data
       });
    } catch (error) {
      console.log(error.response);
    }

   
  };

  // clear Current
  const clearCurrent = () => {
    dispatch({ type: clear_current });
  };

  // Filter contact
  const filterContact = (text: any) => {
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
        getContact,
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
