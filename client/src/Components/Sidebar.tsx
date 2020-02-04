import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Sidebar() {
  return (
    <NavWrapper className="navbar navbar-expand-sm navbar-light px-sm-5">
      <Link to="/">
        <h3 className="navbar-brand mt-2"> <i className="fas fa-id-card-alt"></i> Contact-App</h3>
      </Link>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link text-white">
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contacts" className="nav-link text-white">
            View Contacts
          </Link>
        </li>
      </ul>
      
    </NavWrapper>
  );
}

export default Sidebar;

const NavWrapper = styled.nav`
  background: transparent;
  font-family: 'Righteous', cursive;
  .navbar-brand{
    color: white !important;
    font-size:1.6rem;
  }
  .nav-link {
    color: white !important;
    font-size: 1.4rem;
    text-transform: capitalize;

  }
  .nav-item {
    margin: 0rem 5rem;
    color:white!important
  }
`;
