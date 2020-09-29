import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreHorizontIcon from "@material-ui/icons/MoreHoriz";
import { Dropdown } from "react-bootstrap";
import EditQuestion from "./EditQuestion";

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
  .likes {
    color: white;
  }

  #dropdownBtn {
    background: none;
    border: none;
    border-radius: 60%;
  }
  #dropdownBtn:hover {
    background: #6c757d;
    border-radius: 60%;
  }

  #dropdownBtn::active {
    border: none;
  }
  .dropdown-toggle::after {
    display: none;
  }
`;

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [voteNumber, setVoteNumber] = useState(question.voteNumber);
  const [deleted, setDeleted] = useState(false);
  const session = useContext(UserSession)[0][0];
  const [isLiked, setIsLiked] = useState(question.userVoted);
  let user;
  if (!deleted) user = question.userInfoView;

  const changeLike = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/post/${question.postId}/vote/${session}`).catch((error) => console.log(error));
    if (!isLiked) {
      setVoteNumber(voteNumber + 1);
      setIsLiked(true);
    } else {
      setVoteNumber(voteNumber - 1);
      setIsLiked(false);
    }
  };

  let content = "";

  const deleteQuestion = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/post/${question.postId}/remove`).catch((error) => console.log(error));
    setQuestion(null);
    setDeleted(true);
  };

  if (!deleted) {
    content = (
      <PostDiv className="postDiv" id={question.postId}>
        <div className="postHeader flexbox-item">
          <Link to={`/user/${question.userId}`} className="linkToProfile">
            <div className="profile">
              <img src={user.profilePicture} alt="profilePicture" className="profilePicture" />
              <p className="userName">{user.username}</p>
            </div>
          </Link>
        </div>
        <div className="postBody">
          <div className="imgContainer">
            <img src={question.imagePath} alt=""></img>
          </div>

          <div className="postDescription">
            <Link to={`/question/${question.postId}`} className="link2">
              <p className="postText">{question.description}</p>
            </Link>
          </div>
        </div>
        <div className="postFooter">
          <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
          <RepeatIcon />
          {isLiked ? (
            <span className="likes">
              {voteNumber}
              <FavoriteIcon onClick={changeLike}></FavoriteIcon>
            </span>
          ) : (
            <span className="likes">
              {voteNumber}
              <FavoriteBorderIcon onClick={changeLike} />
            </span>
          )}
          {session === question.userId ? (
            <Dropdown>
              <Dropdown.Toggle id="dropdownBtn">
                <MoreHorizontIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={deleteQuestion}>Delete</Dropdown.Item>
                <Dropdown.Item>
                  <EditQuestion id={question.postId} history={props.history} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
        </div>
        {/* {show === true ? <EditQuestion id={question.postId} show={show} history={props.history} /> : ""} */}
      </PostDiv>
    );
  } else content = "";

  return content;
};

export default Question;
