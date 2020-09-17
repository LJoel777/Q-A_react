import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import trash from "../images/trash.png";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import { Button } from "react-bootstrap";

import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AnswerList from "./AnswerList";
import QuestionAndAnswers from "./QuestionAndAnswers";

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #333;
  padding: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  .postBody > img {
    border-radius: 20px;
    height: auto;
  }
  .postHeader {
    width: 100%;
    position: relative;
  }

  .postFooter {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
    position: relative;

 
  }
  .imgContainer {
    position: relative;
    width: 600px;
    left: 50%;
    transform: translateX(-50%);
  }
  .likes{
    
    color:white;

  }
`;

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [deleted, setDeleted] = useState(false);
  const [username, setUsername] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0][0];
  const [like,setLike] = useState(0);
  const [isLiked,setIsLiked] = useState(false);

  const changeLike =(e)=>{
    e.preventDefault();
    axios.get(`http://localhost:8080/post/${question.id}/vote/${session}/1 `).catch((error) => console.log(error));
    // axios.get(`http://localhost:8080/post/${question.id}/get-vote/${session}`).then((res)=>{
      
    setIsLiked(true);
  // })
};

  let content = "";

  useEffect(() => {
    setIsLoading(true);
    if (question !== null) {
      axios.get(`http://localhost:8080/user/${question.user.id}`).then((res) => {
        setUsername(res.data.username);
        setUserProfilePicture(res.data.profilePicture);
        setIsLoading(false);
      axios.get(`http://localhost:8080/post/${question.id}/get-vote/${session}`).then((res)=>{
        console.log(res.data);
        setLike(res.data);
      })
      });
    }
  }, [question, session, setUsername,isLiked]);

  const deleteQuestion = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/post/${question.id}/remove`).catch((error) => console.log(error));
    setQuestion(null);
    setDeleted(true);
  };

  if (!deleted && !isLoading) {
    content = (
      <PostDiv className="postDiv" id={question.id}>
        <div className="postHeader flexbox-item">
          <Link to={`/user/${question.user.id}`} className="linkToProfile">
            <div className="profile">
              <img src={userProfilePicture} alt="profilePicture" className="profilePicture" />
              <p className="userName">{username}</p>
            </div>
          </Link>
        </div>
        <div className="postBody">
          <div className="imgContainer">
            <img src={question.imagePath} alt=""></img>
          </div>

          <div className="postDescription">
            <Link to={`/question/${question.id}`} className="link2">
              <p className="postText">{question.description}</p>
            </Link>
          </div>
        </div>
        <div className="postFooter">
          <ChatBubbleOutlineIcon fontSize="small" color="white"></ChatBubbleOutlineIcon>
          <RepeatIcon fontSize="small" color="white" />
          <span className="likes">{like}
          <FavoriteBorderIcon fontSize="small" color="white" onClick={changeLike} />
          </span>
          {session === question.userId ? (
            <MoreHorizIcon fontSize="small" color="white">
              <p class="postSettings" href={`/editQuestion/${question.id}`}>
                Edit post
              </p>
              <p class="postSettings" onClick={deleteQuestion}>
                Delete post
              </p>
            </MoreHorizIcon>
          ) : (
            ""
          )}
        </div>
      </PostDiv>
    );
  } else content = "";

  return content;
};

export default Question;
