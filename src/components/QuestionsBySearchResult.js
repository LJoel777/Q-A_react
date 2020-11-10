import React, { useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
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

const QuestionBySearchResult = (props) => {
  console.log(props.location.state.result);
  const questions = props.location.state.result;
  const [showChat, setShowChat] = useContext(ChatHelperContext);
  const session = useContext(UserSession)[0][0];

  return (
    <Container className="col">
      <SideNarBar />
      <div className="feed">
        <PostModal className="postModal" isLoading={false} session={session} history={props.history} />
        {questions.map((question) => {
          return <Question key={question.postId} question={question} history={props.history} />;
        })}
      </div>
      <div className="chatSide">
        <MessageContextProvider>
          <Chat show={showChat} setShowChat={setShowChat.bind(this)} />
        </MessageContextProvider>
      </div>
    </Container>
  );
};

export default QuestionBySearchResult;
