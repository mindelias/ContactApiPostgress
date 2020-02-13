import React, { Fragment, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../context/auth/AuthContext";

function Sidebar() {
  const history = useHistory()
  const {
    state: { isAuthenticated, user },
    LogOut
  } = useContext(AuthContext);
  const logOut = () => {
    LogOut();
    history.push('/')

  };

  const privateLinks = (
    <Fragment>
      {console.log(user)}
      <li className="nav-item text-white">Welcome {user && user.fullname}</li>
      <li className="nav-item text-white" onClick={logOut}>
        <a className="text-white" href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const publicLinks = (
    <Fragment>
      <li className="nav-item">
        <Link to="/register" className="nav-link text-white">
          SignUP
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link text-white">
          SignIN
        </Link>
      </li>
    </Fragment>
  );

  return (
    <NavWrapper className="navbar navbar-expand-sm navbar-light px-sm-5">
      <Link to="/">
        <h3 className="navbar-brand ">
          {" "}
          <i className="fas fa-id-card-alt"></i> Contact-App
        </h3>
      </Link>

      <ul className="navbar-nav ml-auto mt-3">
        {isAuthenticated ? privateLinks : publicLinks}
      </ul>
    </NavWrapper>
  );
}

export default Sidebar;

const NavWrapper = styled.nav`
  background: rgb(0, 84, 205);
  font-family: "Righteous", cursive;
  .navbar-brand {
    color: white !important;
    font-size: 1.6rem;
  }
  .nav-link {
    color: white !important;

    text-transform: capitalize;
  }
  a {
    text-decoration: none;
  }
  .nav-item {
    margin: 0rem 5rem;
    color: white !important;
    font-size: 1.1rem;
  }
`;
