import React from "react";
import QuestionsList from "./components/QuestionsList";
import QuestionAndAnswer from "./components/QuestionAndAnswers";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={QuestionsList} />
        <Route exact path="/question/:id" component={QuestionAndAnswer} />
      </Router>
    </div>
  );
}

export default App;
