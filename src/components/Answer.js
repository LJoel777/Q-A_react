import React from "react";
import styled from "styled-components";

const AnswerDiv = styled.div`
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  background: white;
  max-width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  img {
    width: 20%;
  }
`;

const Answer = (props) => {
  const answer = props.answer;
  return (
    <AnswerDiv>
      <h1>{answer.description}</h1>
      <img src={answer.imgPath} alt=""></img>
    </AnswerDiv>
  );
};

export default Answer;
