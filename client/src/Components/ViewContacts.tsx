import React from "react";
import Contacts from "../Components/Contacts/Contacts";
import AddContact from "./Contacts/AddContact";
import FilterContact from './Contacts/FilterContact'

function ViewContacts() {
  return (
    <div className="container justify-content-between">
      <div className="row">
        <div className="col-md-6">
          <AddContact />
        </div>
        <div className="col-md-6">
          <FilterContact/>
          <Contacts />
        </div>
      </div>
    </div>
  );
}

export default ViewContacts;
