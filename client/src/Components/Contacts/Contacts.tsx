import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/ContactContext";
import ContactItem from "./ContactItem";

function Contacts() {
  const {
    state: { contacts, filter, loading },
    getContact
  } = useContext(ContactContext);
  const CheckData = useContext(ContactContext);
  console.log(CheckData);
  useEffect(() => {
    getContact();
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Add a Contact</h4>;
  }

  return (
    <div>
      {contacts !== null && !loading ? (
        <div>
          <Fragment>
            {filter !== null
              ? filter.map((contact: any) => (
                  <ContactItem key={contact.id} contact={contact} />
                ))
              : contacts.map((contact: any) => (
                  <ContactItem key={contact.id} contact={contact} />
                ))}
          </Fragment>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Contacts;
