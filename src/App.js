import React from "react";
import QuestionsList from "./components/QuestionsList";
import QuestionAndAnswer from "./components/QuestionAndAnswers";
import NavBar from "./components/NavBar";
import AddQuestion from "./components/AddQuestion";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={QuestionsList} />
        <Route exact path="/question/:id" component={QuestionAndAnswer} />
        <Route exact path="/add" component={AddQuestion} />
      </Router>
    </div>
  );
}

export default App;
