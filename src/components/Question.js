import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const Question = (props) => {
  const question = props.question;
  const id = question.id;
  const title = question.title;
  const description = question.description;
  const image = question.imagePath;
  return (
    <Link to={`/question/${id}`} style={{ textDecoration: "none" }}>
      <QuestionDiv className="question" id={id}>
        <h1>{title}</h1>
        <p>{description}</p>
        <img src={image} alt=""></img>
      </QuestionDiv>
    </Link>
  );
};

export default Question;
