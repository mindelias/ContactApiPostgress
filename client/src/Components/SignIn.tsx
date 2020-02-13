import React, { useState , useContext, useEffect} from "react";
import AuthContext from '../context/auth/AuthContext'
import AlertContext from "../context/alert/AlertContext";
import Alert from '../Components/layout/Alert'
import {useHistory} from 'react-router'
import styled from 'styled-components'
import one from '../images/one.svg'

function SignIn() {
  const { state: {error, isAuthenticated} , Login} = useContext(AuthContext); 
  const { SetAlert } = useContext(AlertContext)
  const history = useHistory()
  
  useEffect(() => {
     if (isAuthenticated) {
       history.push("./contacts");
     }

    if (error) {
      SetAlert(error, "danger");
    }
  }, [error]);
   
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const {  email, password} = user;
  const onchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   if ( !email || !password) {
     SetAlert("Please enter all fields", "danger");
   }  
    else {
     Login({  email, password });
     
   }
  };
  
  // if (shouldRedirect) {
  //   return <Redirect to="/contacts" />;
  // }
//  const [shouldRedirect, setShouldRedirect] = useState(false);
  return (
    <Wrapper>
      <div className="signForm text-center">
        <Alert/>
        <form className="col-8 position" onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-info btn-block">
            Login
          </button>
        </form>
      </div>
      <div className="bg-right"></div>
    </Wrapper>
  );
}

export default SignIn;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 36% 48%;
  height: 100vh;
  /* margin-top: 3rem; */
  .bg-right {
    background-image: url(${one});
    background-size: 130% 80%;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    margin-inline-start:4rem; 
  
  }
  .signForm {
    background: linear-gradient(106deg, #2655ee 0%, #34b3ff 100%);
    text-align: center;
    margin: 3rem 0rem 3rem 6rem;
    border-radius: 15px;
    height: 30rem;
  }
  .position {
    display: inline-block;
    margin: 10rem 5rem;
  }
  .btn-info {
    background: linear-gradient(106deg, #c0392b 0%, #dc7633 100%);
  }
`;