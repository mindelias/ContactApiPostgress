import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/ContactContext";
import ContactItem from "./ContactItem";

function Contacts() {
  const contactContext = useContext(ContactContext);

  const { state } = contactContext;
  if (state.contacts.length === 0) {
    return <h4>Please Add a cOntact</h4>;
  }

  return (
    <div>
      <Fragment>
        {state.filter !== null
          ? state.filter.map((contact :any) => (
              <ContactItem key={contact.id} contact={contact} />
            ))
          : state.contacts.map(contact => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
      </Fragment>
    </div>
  );
}

export default Contacts;
