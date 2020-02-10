import React from 'react';
import {
  BrowserRouter as Router,
  Switch, // for server rendering
  Route, Redirect
} from "react-router-dom";
import Contact from './Components/Contact'
import ViewContacts from './Components/ViewContacts'
import ContactState from './context/ContactState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import SignUp from './Components/Signup'
import SignIn from "./Components/SignIn";
import  setAuthToken from './utils/setAuthToken'
import "bootstrap/dist/css/bootstrap.min.css"

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
 
function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
        <div className="App">
          <React.Fragment>
            <Router>
              {/* <Sidebar /> */}
              <Switch>
                <Route exact path="/">
                  <Contact />
                </Route>
                <Route exact path="/login">
                  <SignIn/>
                </Route>
                <Route exact path="/contacts">
                  <ViewContacts />
                </Route>
              </Switch>
            </Router>
          </React.Fragment>
          </div>
          </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
