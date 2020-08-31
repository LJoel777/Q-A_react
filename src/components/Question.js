import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import trash from "../images/trash.png";
import axios from "axios";

const Container = styled.div`
  .link {
    width: 100%;
    text-decoration: none;
    color: black;
    margin: auto;
  }
  .link:hover {
    color: #76d14f;
  }
`;

const QuestionDiv = styled.div`
  display: flex;
  background: white;
  margin: auto;
  border-radius: 20px;
  padding: 18px;
  width: 70%;
  margin-top: 20px;
  margin-bottom: 10px;
  .textContainer {
    flex: 65%;
  }
  .imageContainer {
    flex: 30%;
    .contentImg {
      width: 100%;
      border-radius: 5px;
    }
  }
  .info {
    flex: 5%;
    max-width: 10px;
    display: relative;
    .trash {
      width: 25px;
      height: 25px;
      position: absolute;
      left: -3px;
      top: 20px;
      transform: translate(50%, -50%);
      z-index: 100;
    }
    .trash:hover {
      width: 30px;
      height: 30px;
    }
  }
`;

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [deleted, setDeleted] = useState(false);
  let content = "";

  const deleteQuestion = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/question/${question.id}/remove`);
    setQuestion({});
    setDeleted(true);
  };
  if (!deleted) {
    content = (
      <Container className="question" id={question.id}>
        <QuestionDiv style={{ position: "relative" }}>
          <div className="info">
            <img src={trash} alt="trash" className="trash" onClick={deleteQuestion}></img>
          </div>
          <Link to={`/question/${question.id}`} className="link">
            <div className="textContainer">
              <h1>{question.title}</h1>
              <p>{question.description}</p>
            </div>
          </Link>
          <div className="imageContainer">
            <img src={question.imagePath} alt="" className="contentImg" />
            <Link to={`/editQuestion/${question.id}`}>Edit question</Link>
          </div>
        </QuestionDiv>
      </Container>
    );
  } else content = "";

  return content;
};

export default Question;
