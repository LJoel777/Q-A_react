import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import trash from "../images/trash.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";

const AnswerDiv = styled.div`
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  background: #333;
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
  .profile {
    margin-top: -22px;
    margin-left: -22px;
    flex: 20%;
    padding: 10px;
    text-align: left;
    .profilePicture {
      float:left;
      border-radius: 50%;
      width: 50px;
    }
  }
  .linkToProfile {
    text-decoration: none;
    color: white;
  }

  h1{
    color:white;
  }

  .userName{
    position:relative;
    left:10px;
    font-size:20px;
    font-weight:bold;
    bottom:15px;
  }
`;

const Answer = (props) => {
  const [answer, setAnswer] = useState(props.answer);
  const [deleted, setDeleted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/user/${answer.userId}`).then((res) => {
      setUserName(res.data.userName);
      setUserProfilePicture(res.data.profilePicture);
      setIsLoading(false);
    });
  }, [answer.userId]);

  const deleteAnswer = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/answer/${answer.id}/remove`);
    setAnswer({});
    setDeleted(true);
  };

  if (!deleted && !isLoading) {
    content = (
      <AnswerDiv>
        <Link to={`/user/${answer.userId}`} className="linkToProfile">
          <div className="profile">
            <img src={userProfilePicture} alt="profilePicture" className="profilePicture"></img>
            <br />
            <span className="userName">{userName}</span>
          </div>
        </Link>
        <h1>{answer.description}</h1>
        <img src={answer.imgPath} alt=""></img>
        {session === answer.userId ? (
          <div>
            <img src={trash} alt="trash" className="trash" onClick={deleteAnswer}></img>
            <Link to={`/editAnswer/${props.answer.id}`}>Edit answer</Link>{" "}
          </div>
        ) : (
          ""
        )}
      </AnswerDiv>
    );
  } else content = "";

  return content;
};

export default Answer;
