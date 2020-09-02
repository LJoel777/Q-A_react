import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {UserSessionProvider} from "./context/UserSession"
import Main from "./components/Main"
import UserPage from "./components/UserPage";

function App() {
  return (
    <div className="App">
      <Router>
        <UserSessionProvider>
          <Main>
          </Main>
        </UserSessionProvider>
        <NavBar />
        <Route exact path="/" component={QuestionsList} />
        <Route exact path="/question/:id" component={QuestionAndAnswer} />
        <Route exact path="/addQuestion" component={AddQuestion} />
        <Route exact path="/addAnswer/:id" component={AddAnswer} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/editQuestion/:id" component={EditQuestion} />
        <Route exact path="/editAnswer/:id" component={EditAnswer} />
        <Route exact path="/user/:id" component={UserPage} />
      </Router>
    </div>
  );
}

export default App;
