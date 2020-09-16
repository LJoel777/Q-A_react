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
// import { useGet } from "../axios";

const PostDiv = styled.div`


  display: flex;
  flex-direction: column;
  align-items: center;
  position:relative;
  background: #333;
  padding: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  .postBody > img {
    border-radius: 20px;
    height:auto;
  }
  .postHeader{
    width: 100%;
    position: relative;
}
  
  .postFooter {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width:100%;
    position:relative;
  }
  .imgContainer{
    position: relative;
    width: 600px;
    left: 50%;
    transform: translateX(-50%);
}
  }
    // display:flex;
    // position:relative;
    // flex-direction:row;
    // justify-content:center;
    // background: #333;
    // border-radius: 20px;
    // width:60%;
    // padding: 18px;
    // margin-top: 20px;
    // margin-bottom: 10px;
    // .flexbox-item{
    //     margin:10px;
    // }
    // firstCol{
    //   position:relative;
    //   width:20%
    //   flex:1;
    // }
    // .secondCol{
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // }
    // .trash{
    //   position:absolute;
    //   bottom:5%;
    //   left:5%;
    // }
    // .postDescription{
    //   position: relative;
    //   width: 50%;
    // }
    // .link2 .postText{
    //   word-break: break-all;
    //   color:white;
    //   font-weight:bold;
    // }
    // .profile{
    //   position:absolute;
    //   left:5%
    //   ;
    // }
    p{
      word-break: keep-all;
    }
 

`;

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [deleted, setDeleted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0];
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    if (question !== null) {
      axios.get(`http://localhost:8080/user/${question.userId}`).then((res) => {
        setUserName(res.data.userName);
        setUserProfilePicture(res.data.profilePicture);
        setIsLoading(false);
      });
    }
  }, [question, session]);

  const deleteQuestion = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/question/${question.id}/remove`).catch((error) => console.log(error));
    setQuestion(null);
    setDeleted(true);
  };

  if (!deleted && !isLoading) {
    content = (
        <PostDiv className="postDiv"  id={question.id}>
          <div className="postHeader flexbox-item">
            <Link to={`/user/${question.userId}`} className="linkToProfile">
              <div className="profile">
                <img src={userProfilePicture} alt="profilePicture" className="profilePicture" />
                <p className="userName">{userName}</p>
              </div>
            </Link>
          </div>
            <div className="postBody" >
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
            {/* <div className="trash">{session === question.userId ? <img src={trash} alt="trash" className="trash" onClick={deleteQuestion}></img> : ""}</div>
            </div> */}
             <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <PublishIcon fontSize="small" />
            </div>
          </PostDiv>
           
    );
  } else content = "";

  return content;
};

export default Question;

            {/* {session === question.userId ? (
              <Button className="btn" href={`/editQuestion/${question.id}`}>
                Edit question
              </Button>
            ) : (
              ""
            )} */}