import React, { useState, useEffect } from "react";
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
  max-width: 1000px;
  .textContainer {
    flex: 60%;
  }
  .imageContainer {
    flex: 30%;
    .contentImg {
      width: 100%;
      border-radius: 5px;
    }
  }
  .info {
    flex: 0%;
    max-width: 10px;
    display: relative;
    .trash {
      width: 25px;
      height: 25px;
      position: absolute;
      left: -3px;
      top: 120px;
      transform: translate(50%, -50%);
      z-index: 100;
    }
    .trash:hover {
      width: 30px;
      height: 30px;
    }
  }
  .profile {
    margin-top: -22px;
    margin-left: -22px;
    flex: 20%;
    padding: 10px;
    text-align: left;
    .profilePicture {
      border-radius: 50%;
      width: 50px;
    }
  }
  .linkToProfile {
    text-decoration: none;
    color: black;
  }
`;

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [deleted, setDeleted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/user/${question.userId}`).then((res) => {
      setUserName(res.data.userName);
      setUserProfilePicture(res.data.profilePicture);
      setIsLoading(false);
    });
  }, [question.userId]);

  const deleteQuestion = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/question/${question.id}/remove`);
    setQuestion({});
    setDeleted(true);
  };
  if (!deleted && !isLoading) {
    content = (
      <Container className="question" id={question.id}>
        <QuestionDiv style={{ position: "relative" }}>
          <Link to={`/user/${question.userId}`} className="linkToProfile">
            <div className="profile">
              <img src={userProfilePicture} alt="profilePicture" className="profilePicture"></img>
              <br />
              <span className="userName">{userName}</span>
            </div>
          </Link>
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
