import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import PostModal from "./PostModal";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex: 1;
  min-width: fit-content;
  flex-direction: row;
  .profileSide li p {
    display: inline-flex;
    margin: 10px;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
`;

const QuestionsList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        <div className="feed">
          <PostModal className="postModal" isLoading={isLoading} session={session} history={props.history} />
          {questions.map((question) => (
            <Question key={question.postId} question={question} history={props.history} />
          ))}
        </div>
        <div className="chatSide">
          <ul>{/* <li>casdas</li>
                     <li>dasdas</li>
                     <li>fefefefe</li>
                     <li>fafafaafa</li>
                     <li>fefefefe</li> */}</ul>
        </div>
      </Container>
    );
  } else content = "Loading";
  return content;
};

export default QuestionsList;
