import React from "react";
import QuestionsList from "./QuestionsList";
import QuestionAndAnswer from "./QuestionAndAnswers";
import NavBar from "./NavBar";
import Login from "./Login";
import { Route } from "react-router-dom";
import Register from "./Registration";
import UserPage from "./UserPage";
import Settings from "./Settings";
import ProtectedRoute from "../helpers/Protected.route";
import AxiosConfig from "../AxiosConfig";
import { ChatHelperProvider } from "../context/ChatHelper";

function Main() {
  return (
    <div className="Main">
      <NavBar />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Register} />
      <ProtectedRoute exact path="/user/:id" component={UserPage} />
      <ProtectedRoute exact path="/settings" component={Settings} />
      <ChatHelperProvider>
        <ProtectedRoute exact path="/question/:id" component={QuestionAndAnswer} />
        <ProtectedRoute exact path={["/", "/hobby-news", "/friend-news"]} component={QuestionsList} />
      </ChatHelperProvider>
    </div>
  );
}

export default Main;
