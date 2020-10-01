import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import PostModal from "./PostModal";
import SideNarBar from "./SideNavBar";
import { ChatHelperContext } from "../context/ChatHelper";
import Chat from "./Chat";
import { MessageContextProvider } from "../context/MessageContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .feed {
    flex-grow: 2;
  }
  .chatSide {
    flex-grow: 1;
  }
`;

const QuestionsList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useContext(ChatHelperContext);
  const session = useContext(UserSession)[0][0];
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    let url;
    if (props.match.path === "/" || props.match.path === "/hobby-news") {
      url = `http://localhost:8080/post/hobby-news/${session}`;
    } else {
      url = "http://localhost:8080/post/friend-news/" + session;
    }
    axios.get(url).then((res) => {
      setQuestions(res.data);
      setIsLoading(false);
    });
  }, [props.match.path, session]);

  if (!isLoading) {
    content = (
      <Container className="col">
        <SideNarBar />
        <div className="feed">
          <PostModal className="postModal" isLoading={isLoading} session={session} history={props.history} />
          {questions.map((question) => (
            <Question key={question.postId} question={question} history={props.history} />
          ))}
        </div>
        <div className="chatSide">
          <MessageContextProvider>
            <Chat show={showChat} setShowChat={setShowChat.bind(this)} />
          </MessageContextProvider>
        </div>
      </Container>
    );
  } else content = "Loading";
  return content;
};

export default QuestionsList;
