import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AnswerList from "./AnswerList";

const QuestionDiv = styled.div`
  margin: auto;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  background: white;
  max-width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
  img {
    width: 20%;
  }
`;

const QuestionAndAnswers = ({ match }) => {
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [answerId, setAnswerId] = useState(null);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/question/${match.params.id}`).then((res) => {
      setQuestion(res.data);
      setAnswerId(res.data.id);
      setIsLoading(false);
    });
  }, [match.params.id]);

  if (!isLoading) {
    content = (
      <div>
        <QuestionDiv className="question">
          <h1>{question.title}</h1>
          <p>{question.description}</p>
          <img src={question.imagePath} alt=""></img>
        </QuestionDiv>
        <AnswerList answerId={answerId} />
      </div>
    );
  } else content = "Loading...";

  return content;
};

export default QuestionAndAnswers;
