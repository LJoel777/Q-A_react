import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { UserSession } from "../context/UserSession";
import Question from "./Question";
import SideNarBar from "./SideNavBar";
import Chat from "./Chat";
import Store from "./Store";
import { MessageContextProvider } from "../context/MessageContext";
import { ChatHelperContext } from "../context/ChatHelper";

const QandAContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  .feed {
    flex-grow: 2;
  }
  .chatSide {
    flex-grow: 1;
  }
`;

const QuestionAndAnswers = (props) => {
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useContext(ChatHelperContext);
  const session = useContext(UserSession)[0][0];
  let content = "";
  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/post/${props.match.params.id}/${session}`).then((res) => {
      setQuestion(res.data);
      setIsLoading(false);
    });
  }, [props.match.params.id, session]);

  if (!isLoading) {
    content = (
      <QandAContainer className="col">
        <SideNarBar />
        <div className="feed">
          <Question question={question} history={props.history} />
        </div>
        <div className="chatSide">
          <MessageContextProvider>
            <Store>
              <Chat show={showChat} setShowChat={setShowChat.bind(this)} />
            </Store>
          </MessageContextProvider>
        </div>
      </QandAContainer>
    );
  } else content = "Loading...";

  return content;
};

export default QuestionAndAnswers;
