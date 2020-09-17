import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import PostModal from "./PostModal";

const Container = styled.div``;

const QuestionsList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0][0];

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
      axios.get(url).then((res) => {
        console.log(res.data);
        setQuestions(res.data);
        setIsLoading(false);
      });
    } else console.log("Most");
  }, [session, props.match.path]);

  if (!isLoading && !isNaN(session)) {
    content = (
      <div>
        <PostModal isLoading={isLoading} session={session} history={props.history} />
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

export default QuestionsList;
