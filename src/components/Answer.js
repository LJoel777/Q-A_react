import React, { useState } from "react";
import styled from "styled-components";
import trash from "../images/trash.png";
import axios from "axios";

const AnswerDiv = styled.div`
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  background: white;
  max-width: 60%;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  img {
    width: 20%;
  }
  .trash {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 20px;
    transform: translate(50%, -50%);
    z-index: 100;
  }
  .trash:hover {
    width: 40px;
    height: 40px;
  }
`;

const Answer = (props) => {
  const [answer, setAnswer] = useState(props.answer);
  const [deleted, setDeleted] = useState(false);
  let content = "";

  const deleteAnswer = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/answer/${answer.id}/remove`);
    setAnswer({});
    setDeleted(true);
  };

  if (!deleted) {
    content = (
      <AnswerDiv>
        <h1>{answer.description}</h1>
        <img src={answer.imgPath} alt=""></img>
        <img src={trash} alt="trash" className="trash" onClick={deleteAnswer}></img>
      </AnswerDiv>
    );
  } else content = "";

  return content;
};

export default Answer;
