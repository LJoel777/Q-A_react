import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AnswerList from "./AnswerList";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import {Button} from "react-bootstrap";
import {comment} from "../images/comment-alt-solid.svg"


const PostDiv = styled.div `
  position:relative;
  display: flex;
  background: #333;
  margin: auto;
  border-radius: 20px;
  padding: 18px;
  width: 70%;
  margin-top: 20px;
  margin-bottom: 10px;
  max-width: 1000px;

  .firstCol{
    position:relative;
    width:20%;
    height: inherit;
  }

  .profile{
    position:relative;
    display:inline-block;
  }
  .profile img {
        height:50px;
        width:50px;
        border-radius:20px;
        float:left;
    }


    .trash{
      position:relative;
      bottom: 0px;
      top: 70%;
  }
    
  .trash img{
    height:50px;
    width:50px;
  }

  .userName{
    position :relative;
    display:inline-block;
    font-size:20px;
    font-weight:bold;
    padding:5px;
    left:40px;
    color:white;
    
  }
  p{overflow-wrap: break-word;}

.secondCol{
  position:relative;
  width:80%;
  height:fit-content;
}
.btn{
  position: relative;
    left: 47%;
    transform: translateX(-100%);
}

.textContainer p {
  color: white;
    font-weight: bold;
    font-size: 18px;
}
.secondCol img{
  position:relative;
  width:600px;
  heigth:450px;
}`;


const QuestionAndAnswers = ({ match }) => {
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [answerId, setAnswerId] = useState(null);
  const session = useContext(UserSession)[0];
  const [userName, setUserName] = useState("");
  const [userProfilePicture, setProfilePicture] = useState("");
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/question/${match.params.id}`).then((res) => {
      console.log(match.params.id);
      setQuestion(res.data);
      setAnswerId(res.data.id);
      setIsLoading(false);
    });
  }, [match.params.id, session]);

  if (!isLoading) {
    content = (
      <div>
          <div className="question" id={question.id}>
        <PostDiv>
          <div className="firstCol">
            <span className="profile">
            <img src={userProfilePicture} alt="profilePicture" className="profilePicture"/>
            <p className="userName">{userName} </p>
              </span>  
              
          </div>
          
          <div className="secondCol">
            <img src={question.imagePath} alt="contentImage"></img>
            
            <Link to={`/question/${question.id}`} className="link2">
            <div className="textContainer">
              <p>{question.description}</p>
            </div>
          </Link> 
          <Button  className="add_answer" href={`/addAnswer/${match.params.id}`}>
            Comment
            </Button>
          </div>         

        </PostDiv>
      </div>
        <AnswerList answerId={answerId} />
        </div>
    );
  } else content = "Loading...";

  return content;
};

export default QuestionAndAnswers;
