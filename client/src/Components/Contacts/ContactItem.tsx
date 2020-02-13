import React, { useContext } from "react";
import ContactContext from "../../context/ContactContext";
import styled from 'styled-components'

export interface Items {
  id: string;
  last_name?:string
  first_name: string;
  email?: string;
  phone: string;
  company?: string;
}

function ContactItem({ contact }: { contact: Items }) {
  console.log(contact)
  const contactContext = useContext(ContactContext);
  const { state, addContact, deleteContact , SetCurrent, clearCurrent} = contactContext;
  const { id, first_name, email, last_name, phone, company } = contact;

  const handleDelete = () => {
    deleteContact(id);
    clearCurrent()
  };

  return (
    <Wrapper className="card  my-5">
      <h4 className="text-white text-left">{first_name} {last_name} </h4>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {"  "}
            {email}
          </li>
        )}

        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            {"  "} {phone}
          </li>
        )}
        {company && (
          <li>
            <i className="fas fa-home"></i>
            {"  "}
            {company}
          </li>
        )}
      </ul>
      <div className="row justify-content-around">
        <button
          className="btn btn-info col-3"
          onClick={() => SetCurrent(contact)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger  col-3 btn-small"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Wrapper>
  );
}

export default ContactItem;
const Wrapper = styled.div`
  background: #eaeded;
  padding: 1rem 3rem;
  box-shadow: 2px;

  .btn-info {
    background: #4527a0;
    border: 1px solid #8e44ad;
  }
  .text-white {
    color: #4527a0 !important;
    margin:1rem 2rem
  }
  li {
    list-style-type:none
  }
`;