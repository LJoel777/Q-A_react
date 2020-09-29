import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AnswerList from "./AnswerList";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import Question from "./Question";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import SettingsIcon from "@material-ui/icons/Settings";

const PostAndComment = styled.div`
  .button {
    margin-left: 20%;
    border-radius: 20px;
    padding: 5px;
    background: #333333;
    width: 100px;
    text-align: center;
  }
  .LinkButton {
    text-decoration: none;
    color: white;
  }
  .button:hover {
    background: #76d14f;
    color: black;
  }
`;

const QandAContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0;
  justify-content: center;

  .profileSide svg {
    color: gradient(#cc2b5e → #753a88);
  }
  .profileSide ul {
    position: relative;
    list-style-type: none;
    left: -80%;
  }
  .profileSide li {
    padding: 10px;
    margin: 30px;
  }
  .profileSide li p {
    display: inline-flex;
    margin: 10px;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
`;

const QuestionAndAnswers = ({ match }) => {
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [answerId, setAnswerId] = useState(null);
  const [session, setSession] = useContext(UserSession)[0];
  let content = "";

  const logOut = () => {
    localStorage.setItem("session", null);
    localStorage.setItem("username", null);
    localStorage.setItem("hobbies", null);
    localStorage.removeItem("token");
    localStorage.setItem("session", null);
    setSession(localStorage.getItem("session"));
  };
  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/post/${match.params.id}`).then((res) => {
      console.log(match.params.id);
      setQuestion(res.data);
      setAnswerId(res.data.id);
      setIsLoading(false);
    });
  }, [match.params.id, session]);

  if (!isLoading) {
    content = (
      <QandAContainer>
        <div className="profileSide">
          <ul>
            <li>
              <Link className="link" to={`/user/${session}`}>
                <PersonIcon color="secondary" fontSize="large" />
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <Link className="link" to="/">
                <HomeIcon color="secondary" fontSize="large" />
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link className="link" to="/chat">
                <ChatBubbleIcon color="secondary" fontSize="large" />
                <p>Chat</p>
              </Link>
            </li>
            <li>
              <Link className="link" to={""} onClick={logOut}>
                <PowerSettingsNewIcon color="secondary" fontSize="large" />
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
        <PostAndComment>
          <Question question={question} />
          <Link to={`/addAnswer/${question.id}`} className="LinkButton">
            <div className="button">Comment</div>
          </Link>
          <hr />
          <AnswerList answerId={answerId} />
        </PostAndComment>
        <div className="chatSide">
          <ul>{/* <li>casdas</li>
            <li>dasdas</li>
            <li>fefefefe</li>
            <li>fafafaafa</li>
            <li>fefefefe</li> */}</ul>
        </div>
      </QandAContainer>
    );
  } else content = "Loading...";

  return content;
};

export default QuestionAndAnswers;
