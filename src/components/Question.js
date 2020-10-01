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
import EditPost from "./EditPost";
import AddComment from "./AddComment";
import Answer from "./Answer";
import AnswerList from "./AnswerList";

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
  font-size: 20px;
  .postBody {
    border-radius: 20px;
    height: auto;
    .contentImg {
      width: 100%;
      border-radius: 10px;
    }
  }
  .postHeader {
    width: 100%;
    .profilePicture {
      margin-right: 10px;
      margin-bottom: 10px;
    }
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

  .commentDiv {
    text-align: left;
    width: 100%;
  }
  .likes {
    color: white;
  }
  #dropdownBtn {
    background: none;
    border: none;
    border-radius: 10%;
    outline-style: none;
  }

  #dropdownBtn::active {
    outline: none;
    border: none;
  }

  #dropdownBtn::focus {
    outline: 0;
  }
  .dropdown-toggle::after {
    display: none;
  }

  hr {
    border-top: 1px solid white;
  }
`;

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [deleted, setDeleted] = useState(false);
  const session = useContext(UserSession)[0][0];
  const [isLiked, setIsLiked] = useState(!deleted ? question.userVoted : false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [voteNumber, setVoteNumber] = useState(!deleted ? question.voteNumber : 0);
  const [showCommentModal, setShowCommentModal] = useState("none");
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
            <img src={question.imagePath} alt="" className="contentImg" />
          </div>

          <div className="postDescription">
            <Link to={`/question/${question.postId}`} className="link2">
              <p className="postText">{question.description}</p>
            </Link>
          </div>
        </div>
        <div className="postFooter">
          <ChatBubbleOutlineIcon
            onClick={() => {
              if (showCommentModal === "none") setShowCommentModal("block");
              else setShowCommentModal("none");
            }}
          />
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
              <Dropdown.Menu className="btn">
                <Dropdown.Item onClick={deleteQuestion}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => setShowPostModal(true)}>Edit</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
        </div>
        <div className="commentDiv" style={{ display: showCommentModal }}>
          <hr />
          {showCommentModal === "block" ? <AnswerList questionId={question.postId} /> : ""}
        </div>
        {showPostModal === true ? <EditPost id={question.postId} show={showPostModal} history={props.history} setShowModal={setShowPostModal.bind(this)} /> : " "}
        {showCommentModal === true ? <AddComment id={question.postId} show={showCommentModal} history={props.history} setShowCommentModal={setShowCommentModal.bind(this)} /> : " "}
      </PostDiv>
    );
  } else content = "";

  return content;
};

export default Question;
