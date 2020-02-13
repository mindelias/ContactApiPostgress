import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/ContactContext";

function AddContact() {
  const contactContext = useContext(ContactContext);
  const {
    state: { current },
    addContact,
    clearCurrent,
    updateContact
  } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        company: ""
      });
    }
  }, [contactContext, current]);

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
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company: ""
    });
  };
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div className="my-5">
      <form onSubmit={handleSubmit}>
        <h2 className="text-primary">
          {" "}
          {current ? "Edit Contact" : "Add Contact"}
        </h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="first_name"
            placeholder="Enter first name"
            value={contact.first_name}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Enter last name"
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

        <button type="submit" className="btn btn-primary">
          {current ? "Update Contact" : " Add Contact"}
        </button>
        {current && (
          <div>
            <button
              className="btn btn-secondary"
              onClick={clearAll}
            > clear</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddContact;
