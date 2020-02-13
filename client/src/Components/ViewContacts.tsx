import React, { useEffect, useContext } from "react";
import Contacts from "../Components/Contacts/Contacts";
import AddContact from "./Contacts/AddContact";
import FilterContact from "./Contacts/FilterContact";
import AuthContext from "../context/auth/AuthContext";
import styled from 'styled-components'

function ViewContacts() {
  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div className="container justify-content-between">
      <SearchBar className = 'text-center '>
        <FilterContact />
      </SearchBar>
      <div className="row">
        <div className="col-md-6">
          <AddContact />
        </div>
        <div className="col-md-6">
          <Contacts />
        </div>
      </div>
    </div>
  );
}

export default ViewContacts;
const SearchBar = styled.div`

margin: 1.5rem 

`