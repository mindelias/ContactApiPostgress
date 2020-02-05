import React from 'react';
import {
  BrowserRouter as Router,
  Switch, // for server rendering
  Route
} from "react-router-dom";
import Contact from './Components/Contact'
import ViewContacts from './Components/ViewContacts'
import ContactState from './context/ContactState'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <ContactState>
    <div className="App">
      <React.Fragment>
        <Router>
          {/* <Sidebar /> */}
          <Switch>
            <Route exact path="/">
              <Contact />
            </Route>
            <Route exact path="/contacts">
              <ViewContacts/>
            </Route>
            
          </Switch>
        </Router>
      </React.Fragment>
    </div>
    </ContactState> 
  );
}

export default App;
