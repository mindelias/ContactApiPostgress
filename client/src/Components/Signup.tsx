import React, {useState }from "react";

function Signup() {

  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    password2:''

    
  })
  const { fullname, email, password, password2 } = user
  const onchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('register user')
  };



  return (
    <div className="container col-4">
      <form onSubmit = {handleSubmit}>
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

        <button type="submit" className="btn btn-info">
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
