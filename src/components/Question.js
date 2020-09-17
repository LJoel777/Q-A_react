import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import trash from "../images/trash.png";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import { Button } from "react-bootstrap";

const PostDiv = styled.div`
  position: relative;
  display: flex;
  background: #333;
  margin: auto;
  border-radius: 20px;
  padding: 18px;
  width: 70%;
  margin-top: 20px;
  margin-bottom: 10px;
  max-width: 1000px;

  .firstCol {
    position: relative;
    width: 20%;
    height: inherit;
  }

  .profile {
    position: relative;
    display: inline-block;
  }
  .profile img {
    height: 50px;
    width: 50px;
    border-radius: 20px;
    float: left;
  }

  .trash {
    position: relative;
    top: 5px;
  }
  .trash img {
    height: 50px;
    width: 50px;
  }
  .trash:hover {
    height: 55px;
    width: 55px;
  }

  .userName {
    position: relative;
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    padding: 5px;
    left: 10px;
    color: white;
  }
  p {
    overflow-wrap: break-word;
  }

  .secondCol {
    position: relative;
    width: 80%;
    height: fit-content;
  }
  .btn {
    position: relative;
    left: 47%;
    transform: translateX(-100%);
  }
  .textContainer p {
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
  .secondCol img {
    position: relative;
    width: 600px;
    height: 450px;
  }
`;

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [deleted, setDeleted] = useState(false);
  const [username, setUsername] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0][0];
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    if (question !== null) {
      axios.get(`http://localhost:8080/user/${question.user.id}`).then((res) => {
        setUsername(res.data.username);
        setUserProfilePicture(res.data.profilePicture);
        setIsLoading(false);
      });
    }
  }, [question, session, setUsername]);

  const deleteQuestion = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/post/${question.id}/remove`).catch((error) => console.log(error));
    setQuestion(null);
    setDeleted(true);
  };

  if (!deleted && !isLoading) {
    content = (
      <div className="question" id={question.id}>
        <PostDiv>
          <div className="firstCol">
            <Link to={`/user/${question.user.id}`} className="linkToProfile">
              <span className="profile">
                <img src={userProfilePicture} alt="profilePicture" className="profilePicture" />
                <p className="userName">{username}</p>
              </span>
            </Link>
            <div className="trash">{session === question.user.id ? <img src={trash} alt="trash" className="trash" onClick={deleteQuestion}></img> : ""}</div>
          </div>

          <div className="secondCol">
            <img src={question.imagePath} alt=""></img>

            <Link to={`/question/${question.id}`} className="link2">
              <div className="textContainer">
                <p>{question.description}</p>
              </div>
            </Link>
            {session === question.user.id ? (
              <Button className="btn" href={`/editQuestion/${question.id}`}>
                Edit question
              </Button>
            ) : (
              ""
            )}
          </div>
        </PostDiv>
      </div>
    );
  } else content = "";

  return content;
};

export default Question;
