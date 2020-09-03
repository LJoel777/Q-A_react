import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";

const Container = styled.div``;

const QuestionsList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0];
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    let url;
    if (props.match.path === "/" || props.match.path === "/hobby-news") {
      url = "http://localhost:8080/hobby-news/" + session;
    } else {
      url = "http://localhost:8080/friend-news/" + session;
    }
    if (!isNaN(session)) {
      console.log(session);
      axios.get(url).then((res) => {
        console.log(res);
        setQuestions(res.data);
        setIsLoading(false);
      });
    }
  }, [session, props.match.path]);

  if (!isLoading && !isNaN(session)) {
    content = (
      <div>
        <LinkDiv>
          <Link className="link" to="/">
            News by hobbies
          </Link>
          <Link className="link" to="/friend-news">
            News by friends
          </Link>
        </LinkDiv>
        <Container className="col">
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </Container>
      </div>
    );
  } else if (isNaN(session)) {
    props.history.push("/login");
  } else content = "Loading";
  return content;
};

const LinkDiv = styled.div`
  background-color: #333;
  overflow: hidden;
  .link {
    font-size: 20px;
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  .link:hover {
    background-color: #76d14f;
    color: black;
  }

  .link:active {
    background-color: #333;
    color: white;
  }
`;

export default QuestionsList;
