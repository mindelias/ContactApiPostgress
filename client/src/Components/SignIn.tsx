import React, { useState , useContext, useEffect} from "react";
import AuthContext from '../context/auth/AuthContext'
import AlertContext from "../context/alert/AlertContext";


function SignIn() {
  const { state: {error} , Login} = useContext(AuthContext); 
  const { SetAlert } = useContext(AlertContext)
  
  useEffect(() => {
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
    <div className="container col-4 my-5">
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-info">
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
