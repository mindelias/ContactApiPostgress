import React from "react";

function Signup() {
  return (
    <div className="container col-4">
      <form action="/action_page.php">
      <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="fullname"
            placeholder="Enter fullname"
            value=""
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pwd"
          />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" name="remember" /> Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-default">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
