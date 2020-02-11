import React, { useContext, useState, useRef } from "react";
import ContactContext from "../../context/ContactContext";

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
    <div>
      <form
        className="form-inline active-pink-3 active-pink-4"
        onSubmit={handleSearch}
      >
        <i className="fas fa-search" aria-hidden="true"></i>
        <input
          className="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={onChageInput}
        />
        <button className="btn btn-info aqua-gradient rounded-sm btn-sm my-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default FilterContact;
