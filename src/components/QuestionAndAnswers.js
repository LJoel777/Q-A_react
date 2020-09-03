import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AnswerList from "./AnswerList";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import {Button} from "react-bootstrap";
import {comment} from "../images/comment-alt-solid.svg"

// const Container = styled.div`
//   .link {
//     width: 100%;
//     text-decoration: none;
//     color: black;
//     margin: auto;
//   }
//   .link:hover {
//     color: #76d14f;
//   }
// `;

// const QuestionDiv = styled.div`
//   display: flex;
//   background: white;
//   margin: auto;
//   border-radius: 20px;
//   padding: 18px;
//   width: 70%;
//   margin-top: 20px;
//   margin-bottom: 10px;
//   max-width: 1000px;
//   .postContainer{
//     position:relative;
//   }
//   .link2{
//     position:relative;
//     display:flex;
//   }
//   .textContainer {
//     position: absolute;
//     display:flex;
//     flex: 60%;
//     left: 50%;
//     transform: translateX(-50%);
//   }
//   .imageContainer {
//     .contentImg {
//       width: 600px;
//       height:400px;
//       border-radius: 5px;
//     }
//   }
//   .info {
//     flex: 0%;
//     max-width: 10px;
//     display: relative;
//     .trash {
//       width: 25px;
//       height: 25px;
//       position: absolute;
//       left: -3px;
//       top: 120px;
//       transform: translate(50%, -50%);
//       z-index: 100;
//     }
//     .trash:hover {
//       width: 30px;
//       height: 30px;
//     }
//   }
//   .profile {
//     margin-top: -22px;
//     margin-left: -22px;
//     flex: 20%;
//     padding: 10px;
//     text-align: left;
//     .profilePicture {
//       border-radius: 50%;
//       width: 50px;
//     }
//   }
//   .linkToProfile {
//     text-decoration: none;
//     color: black;
//   }
// `;

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
    }
  .trash img{
    height:50px;
    width:50px;
  }

  .userName{
    display:inline-block;
    font-size:15px;
    font-weight:bold;
    padding:5px;
    
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
}
`;
// const QuestionDiv = styled.div`
//   display: flex;
//   background: white;
//   margin: auto;
//   border-radius: 20px;
//   padding: 18px;
//   width: 70%;
//   margin-top: 20px;
//   margin-bottom: 10px;
//   font-size: 1.1em;
//   .textContainer {
//     flex: 70%;
//   }
//   .imageContainer {
//     flex: 30%;
//     min-width: 200px;
//     .contentImg {
//       width: 100%;
//       border-radius: 5px;
//     }
//   }
//   display: relative;
//   .add_answer {
//     width: 15%;
//     position: absolute;
//     right: 20px;
//     top: 110px;
//     text-align: center;
//     border: none;
//     border-radius: 7px;
//     background: #333;
//     color: #f2f2f2;
//     font-weight: bold;
//     padding: 10px;
//     text-decoration: none;
//     z-index: 100;
//     max-width: 100px;
//   }

//   .add_answer:hover {
//     background: #76d14f;
//     color: #000;
//   }
//   .profile {
//     margin-top: -22px;
//     margin-left: -22px;
//     flex: 20%;
//     padding: 10px;
//     text-align: left;
//     .profilePicture {
//       border-radius: 50%;
//       width: 50px;
//     }
//   }
//   .linkToProfile {
//     text-decoration: none;
//     color: black;
//   }
// `;

const QuestionAndAnswers = ({ match }) => {
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [answerId, setAnswerId] = useState(null);
  const session = useContext(UserSession);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/question/${match.params.id}`).then((res) => {
      setQuestion(res.data);
      setAnswerId(res.data.id);
      setIsLoading(false);
    });
  }, [match.params.id]);

  const [userName, setUserName] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/user/${question.userId}`).then((res) => {
      setUserName(res.data.userName);
      setUserProfilePicture(res.data.profilePicture);
      setIsLoading(false);
    });
  }, [question.userId]);

  if (!isLoading) {
    content = (
      <div>
        {/* <QuestionDiv className="question">
          <Link to={`/user/${question.userId}`} className="linkToProfile">
            <div className="profile">
              <img src={userProfilePicture} alt="profilePicture" className="profilePicture"></img>
              <br />
              <span className="userName">{userName}</span>
            </div>
          </Link>
          <div className="textContainer">
            <h1>{question.title}</h1>
            <p>{question.description}</p>
            <Link className="add_answer" to={`/addAnswer/${match.params.id}`}>
              Add answer
            </Link>
          </div>
          <div className="imageContainer">
            <img src={question.imagePath} alt="" className="contentImg"></img>
            {session === question.userId ? <Link to={`/editQuestion/${question.id}`}>Edit question</Link> : ""}
          </div>
        </QuestionDiv> */}
          <div className="question" id={question.id}>
        <PostDiv>
          <div className="firstCol">
            <span className="profile">
            <p className="userName">{userName} <img src={userProfilePicture} alt="profilePicture" className="profilePicture"/>
               </p>
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
