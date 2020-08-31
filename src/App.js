import React from "react";
import QuestionsList from "./components/QuestionsList";
import QuestionAndAnswer from "./components/QuestionAndAnswers";
import NavBar from "./components/NavBar";
import AddQuestion from "./components/AddQuestion";
import AddAnswer from "./components/AddAnswer";
import EditQuestion from "./components/EditQuestion";
import EditAnswer from "./components/EditAnswer";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={QuestionsList} />
        <Route exact path="/question/:id" component={QuestionAndAnswer} />
        <Route exact path="/addQuestion" component={AddQuestion} />
        <Route exact path="/addAnswer/:id" component={AddAnswer} />
        <Route exact path="/editQuestion/:id" component={EditQuestion} />
        <Route exact path="/editAnswer/:id" component={EditAnswer} />
      </Router>
    </div>
  );
}

export default App;
