import React from "react";
import QuestionsList from "./QuestionsList";
import QuestionAndAnswer from "./QuestionAndAnswers";
import NavBar from "./NavBar";
import AddQuestion from "./AddQuestion";
import AddAnswer from "./AddAnswer";
import Login from "./Login";
import EditQuestion from "./EditQuestion";
import EditAnswer from "./EditAnswer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {UserSession} from "../context/UserSession"
import { useState,useContext } from "react";
import Register from "./Registration";
import UserPage from "../components/UserPage";

function Main() {
  return (
    <div className="Main">
        <NavBar />
        <Route exact path="/" component={QuestionsList} />
        <Route exact path="/question/:id" component={QuestionAndAnswer} />
        <Route exact path="/addQuestion" component={AddQuestion} />
        <Route exact path="/addAnswer/:id" component={AddAnswer} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Register} />
        <Route exact path="/editQuestion/:id" component={EditQuestion} />
        <Route exact path="/editAnswer/:id" component={EditAnswer} />
        <Route exact path="/user/:id" component={UserPage} />
    </div>
  );
}

export default Main;
