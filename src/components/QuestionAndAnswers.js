import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AnswerList from "./AnswerList";
import { Link } from "react-router-dom";

const QuestionDiv = styled.div`
  display: flex;
  background: white;
  margin: auto;
  border-radius: 20px;
  padding: 18px;
  width: 70%;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 1.1em;
  .textContainer {
    flex: 70%;
  }
  .imageContainer {
    flex: 30%;
    min-width: 200px;
    .contentImg {
      width: 100%;
      border-radius: 5px;
    }
  }
  display: relative;
  .add_answer {
    width: 15%;
    position: absolute;
    right: 20px;
    top: 110px;
    text-align: center;
    border: none;
    border-radius: 7px;
    background: #333;
    color: #f2f2f2;
    font-weight: bold;
    padding: 10px;
    text-decoration: none;
    z-index: 100;
    max-width: 100px;
  }

  .add_answer:hover {
    background: #76d14f;
    color: #000;
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
          <div className="textContainer">
            <h1>{question.title}</h1>
            <p>{question.description}</p>
            <Link className="add_answer" to={`/addAnswer/${match.params.id}`}>
              Add answer
            </Link>
          </div>
          <div className="imageContainer">
            <img src={question.imagePath} alt="" className="contentImg"></img>
            <Link to={`/editQuestion/${question.id}`}>Edit question</Link>
          </div>
        </QuestionDiv>
        <AnswerList answerId={answerId} />
      </div>
    );
  } else content = "Loading...";

  return content;
};

export default QuestionAndAnswers;
