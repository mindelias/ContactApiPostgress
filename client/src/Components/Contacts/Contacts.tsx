import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/ContactContext";
import ContactItem from './ContactItem'

function Contacts() {
  const contactContext = useContext(ContactContext);

  const { state } = contactContext;

  return (
    <div>
      <Fragment>
        {state.contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact}/>
        ))}
      </Fragment>
    </div>
  );
}

export default Contacts;
