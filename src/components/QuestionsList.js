import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";

const Container = styled.div``;

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:8080/questions").then((res) => {
      setQuestions(res.data);
      setIsLoading(false);
    });
  }, []);

  if (!isLoading) {
    content = (
      <Container className="col">
        {questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </Container>
    );
  } else content = "Loading";

  return content;
};

export default QuestionsList;
