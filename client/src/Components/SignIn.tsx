import React, { useState } from "react";

function SignIn() {
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
    console.log("login sucesful");
  };

  return (
    <div className="container col-4">
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
          Register
        </button>
      </form>
    </div>
  );
}

export default SignIn;
