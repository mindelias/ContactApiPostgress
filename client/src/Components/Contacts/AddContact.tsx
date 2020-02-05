import React, { useState, useContext } from "react";
import ContactContext from "../../context/ContactContext";

function AddContact() {
  const contactContext = useContext(ContactContext);
  const {state, addContact} = contactContext
  const [contact, setContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: ""
  });
  const onChangeInput = (e: any) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addContact(contact);
    setContact({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company: ""
    });
  };

  return (
    <div className="my-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="first_name"
            placeholder="Enter first_name"
            value={contact.first_name}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="last_name"
            placeholder="Enter last_name"
            value={contact.last_name}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Enter Phone number"
            value={contact.phone}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={contact.email}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="company"
            placeholder="Enter company name"
            value={contact.company}
            onChange={onChangeInput}
          />
        </div>

        <button type="submit" value="add Contact" className="btn btn-default">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddContact;
