import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../context/alert/AlertContext";
import Alert from "../Components/layout/Alert";
import AuthContext from "../context/auth/AuthContext";
import { Redirect, useHistory } from "react-router";
import styled from 'styled-components'
import three from '../images/two.svg'


function Signup() {
  const history = useHistory()
  const { SetAlert } = useContext(AlertContext);
  // const [shouldRedirect, setShouldRedirect] = useState(false);
  const {
    Register,
    state: { error, isAuthenticated }
  } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('./contacts')
    }

    if (error) {
      SetAlert(error, "danger");
    }
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: ""
  });
  const { fullname, email, password, password2 } = user;
  const onchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      SetAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      SetAlert("Password do not match", "danger");
    } else if (password.length < 6) {
      SetAlert(
        `Password must be atleast 6 charcters, you are currently using ${password.length} character`,
        "warning"
      );
    } else {
      Register({ fullname, email, password });
      console.log(Register({ fullname, email, password }));
    }
  };

  return (
    <Wrapper>
      <div className="bg-right"></div>
      <div className="signForm text-center">
        <Alert />
        <form className="col-8 position" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              placeholder="Enter fullname"
              value={fullname}
              onChange={onchangeInput}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={onchangeInput}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={onchangeInput}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={onchangeInput}
            />
          </div>

          <button type="submit" className="btn btn-info btn-block">
            Register
          </button>
        </form>
      </div>
    </Wrapper>
  );
}

export default Signup;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 36%;
  height: 100vh;
  /* margin-top: 3rem; */
  .bg-right {
    background-image: url(${three});
    background-size: 120% 80%;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    margin:3rem 3rem 0rem -13rem;
  }
  .signForm {
    background: linear-gradient(106deg, #2655ee 0%, #34b3ff 100%);
    text-align: center;
    margin: 4rem 0rem 3rem 6rem;
    border-radius: 15px;
    height: 30rem;
  }
  .position {
    display: inline-block;
    margin: 8rem 5rem;
  }
  .btn-info {
    background: linear-gradient(106deg, #c0392b 0%, #dc7633 100%);
    padding: 10px;
  }
`;
