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
  display: flex;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  .button {
    margin-right: 20px;
    border-radius: 20px;
    padding: 5px;
    background: #333333;
    width: 100px;
    text-align: center;
  }
  .LinkButton {
    text-decoration: none;
    color: white;
  }
  .button:hover {
    background: #76d14f;
    color: black;
  }
  img {
    width: 20%;
    flex: 20%;
  }
  .trash {
    flex: 5%;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 90px;
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
    text-align: center;
    .profilePicture {
      float: left;
      border-radius: 50%;
      width: 50px;
    }
  }
  .linkToProfile {
    text-decoration: none;
    color: white;
    margin: 10px;
  }

  p {
    color: white;
    font-size: 20px;
  }

  .userName {
    left: 60px;
    font-size: 20px;
    font-weight: bold;
    bottom: 38px;
  }
  .description {
    flex: 70%;
    margin: auto;
    text-align: left;
  }
`;

const Answer = (props) => {
  const [answer, setAnswer] = useState(props.answer);
  const [deleted, setDeleted] = useState(false);
  const [username, setUsername] = useState("");

  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0];
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    if (answer !== null) {
      axios.get(`http://localhost:8080/user/${answer.user.id}`).then((res) => {

        setUsername(res.data.username);

        setUserProfilePicture(res.data.profilePicture);
        setIsLoading(false);
      });
    }
  }, [answer]);

  const deleteAnswer = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/answer/${answer.id}/remove`);
    setAnswer(null);
    setDeleted(true);
  };

  if (!deleted && !isLoading) {
    content = (
      <AnswerDiv>
        <Link to={`/user/${answer.user.id}`} className="linkToProfile">
          <div className="profile">
            <img src={userProfilePicture} alt="profilePicture" className="profilePicture"></img>
            <br />
            <span className="userName">{username}</span>

          </div>
        </Link>
        <p className="description">{answer.description}</p>
        <img src={answer.imgPath} alt=""></img>
        {session === answer.user.id ? (
          <div>
            <img src={trash} alt="trash" className="trash" onClick={deleteAnswer}></img>
            <Link to={`/editAnswer/${props.answer.id}`} className="LinkButton">
              <div className="button">Edit comment</div>
            </Link>{" "}
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
