import React, { useContext, useState, useRef } from "react";
import ContactContext from "../../context/ContactContext";
import styled from 'styled-components'
function FilterContact() {
  const {
    state: { filter },
    filterContact,
    clearFilter
  } = useContext(ContactContext);
  // const text = useRef('');
  const [search, setSearch] = useState("");

  const onChageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    if (search !== "") {
      filterContact(search);
    } else {
      clearFilter();
    }
  };

  return (
    <Search>
      <form
        className="form-inline col-8 "
        onSubmit={handleSearch}
      >
        <i className="fas fa-search" aria-hidden="true"></i>
        <input
          className="form-control form-control-lg ml-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={onChageInput}
        />
        <button className="btn btn-info  rounded-sm btn-lg my-0" type="submit">
          Search
        </button>
      </form>
    </Search>
  );
}

export default FilterContact;
const Search = styled.div`
  text-align: center;
  form {
    display: inline-block;
    margin: 1rem 0rem;
  }
  .btn-info {
    background: #4527a0;
    border: 1px solid #8e44ad;
  }
`;
