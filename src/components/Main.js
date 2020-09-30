import React from "react";
import QuestionsList from "./QuestionsList";
import QuestionAndAnswer from "./QuestionAndAnswers";
import NavBar from "./NavBar";
import AddComment from "./AddComment";
import Login from "./Login";
import EditPost from "./EditPost";
import EditAnswer from "./EditComment";
import { Route } from "react-router-dom";
import Register from "./Registration";
import UserPage from "./UserPage";
import Chat from "./Chat";
import Store from "./Store";
import Settings from "./Settings";
import { MessageContextProvider } from "../context/MessageContext";
import ProtectedRoute from "../helpers/Protected.route";
import AxiosConfig from "../AxiosConfig";

function Main() {
  return (
    <div className="Main">
      <NavBar />
      <ProtectedRoute exact path={["/", "/hobby-news", "/friend-news"]} component={QuestionsList} />
      <ProtectedRoute exact path="/question/:id" component={QuestionAndAnswer} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Register} />
      <ProtectedRoute exact path="/user/:id" component={UserPage} />
      <ProtectedRoute exact path="/settings" component={Settings} />
      <MessageContextProvider>
        <Store>
          <Route exact path="/chat" component={Chat} />
        </Store>
      </MessageContextProvider>
    </div>
  );
}

export default Main;
