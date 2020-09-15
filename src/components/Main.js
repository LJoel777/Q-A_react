import React from "react";
import QuestionsList from "./QuestionsList";
import QuestionAndAnswer from "./QuestionAndAnswers";
import NavBar from "./NavBar";
import AddQuestion from "./AddQuestion";
import AddAnswer from "./AddAnswer";
import Login from "./Login";
import EditQuestion from "./EditQuestion";
import EditAnswer from "./EditAnswer";
import { Route } from "react-router-dom";
import Register from "./Registration";
import UserPage from "./UserPage";
import Chat from "./Chat";
import Store from "./Store";

function Main() {
  return (
    <div className="Main">
      <NavBar />
      <Route exact path={["/", "/hobby-news", "/friend-news"]} component={QuestionsList} />
      <Route exact path="/question/:id" component={QuestionAndAnswer} />
      <Route exact path="/addQuestion" component={AddQuestion} />
      <Route exact path="/addAnswer/:id" component={AddAnswer} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Register} />
      <Route exact path="/editQuestion/:id" component={EditQuestion} />
      <Route exact path="/editAnswer/:id" component={EditAnswer} />
      <Route exact path="/user/:id" component={UserPage} />
      <Store>
      <Route exact path="/chat" component={Chat}/>
      </Store>
    </div>
  );
}

export default Main;
