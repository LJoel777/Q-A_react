import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

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
`;

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const user = question.userInfoView;
  const [voteNumber, setVoteNumber] = useState(question.voteNumber);
  const [deleted, setDeleted] = useState(false);
  const session = useContext(UserSession)[0][0];
  const [isLiked, setIsLiked] = useState(question.userVoted);

  const changeLike = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/post/${question.postId}/vote/${session}`).catch((error) => console.log(error));
    setVoteNumber(voteNumber + 1);
    setIsLiked(true);
  };

  let content = "";

  useEffect(() => {
    setIsLoading(true);
    if (question !== null) {
      axios.get(`http://localhost:8080/user/${question.user.id}`).then((res) => {
        setUsername(res.data.username);
        setUserProfilePicture(res.data.profilePicture);
        setIsLoading(false);
        axios.get(`http://localhost:8080/post/${question.postId}/get-vote/${session}`).then((res) => {
          console.log(res.data);
          setLike(res.data);
        });
      });
    }
  }, [question, session, setUsername, isLiked]);

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
          <ChatBubbleOutlineIcon fontSize="small" color="white"></ChatBubbleOutlineIcon>
          <RepeatIcon fontSize="small" color="white" />
          {isLiked ? (
            <span className="likes">
              {voteNumber}
              <FavoriteIcon fontSize="small" color="white"></FavoriteIcon>
            </span>
          ) : (
            <span className="likes">
              {voteNumber}
              <FavoriteBorderIcon fontSize="small" color="white" onClick={changeLike} />
            </span>
          )}
          {session === question.userId ? (
            <MoreHorizIcon fontSize="small" color="white">
              <p class="postSettings" href={`/editQuestion/${question.postId}`}>
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
