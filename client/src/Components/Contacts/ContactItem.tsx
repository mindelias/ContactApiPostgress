import React, { useContext } from "react";
import ContactContext from "../../context/ContactContext";

export interface Items {
  id: string;
  first_name: string;
  email: string;
  phone: string;
  company: string;
}

function ContactItem({ contact }: { contact: Items }) {
  const contactContext = useContext(ContactContext);
  const { state, addContact, deleteContact , SetCurrent, clearCurrent} = contactContext;
  const { id, first_name, email, phone, company } = contact;

  const handleDelete = () => {
    deleteContact(id);
    clearCurrent()
  };

  return (
    <div className="card  bg-warning my-5">
      <h3 className="text-primary text-left">{first_name} </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {email}
          </li>
        )}

        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            {phone}
          </li>
        )}
      </ul>
      <div className="row justify-content-around">
        <button className="btn btn-info  col-3" onClick ={() => SetCurrent(contact)}>Edit</button>
        <button
          className="btn btn-danger  col-3 btn-small"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContactItem;
