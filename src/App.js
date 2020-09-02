import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {UserSessionProvider} from "./context/UserSession"
import Main from "./components/Main"

function App() {
  return (
    <div className="App">
      <Router>
        <UserSessionProvider>
          <Main>
          </Main>
        </UserSessionProvider>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
