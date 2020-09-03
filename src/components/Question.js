import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import trash from "../images/trash.png";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import {Button} from "react-bootstrap";

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
    position :relative;
    display:inline-block;
    font-size:20px;
    font-weight:bold;
    padding:5px;
    left:10px;
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

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [deleted, setDeleted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const session = parseInt(useContext(UserSession));
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/user/${question.userId}`).then((res) => {
      setUserName(res.data.userName);
      setUserProfilePicture(res.data.profilePicture);
      setIsLoading(false);
    });
  }, [question.userId]);

  const deleteQuestion = (e) => {
    console.log(question.id);
    e.preventDefault();
    axios.get(`http://localhost:8080/question/${question.id}/remove`).catch((error) => console.log(error));
    setQuestion({});
    setDeleted(true);
  };

  if (!deleted && !isLoading) {
    content = (
      <div className="question" id={question.id}>
        <PostDiv>
          <div className="firstCol">
          <Link to={`/user/${question.userId}`} className="linkToProfile">
            <span className="profile">
            <img src={userProfilePicture} alt="profilePicture" className="profilePicture"/>
            <p className="userName">{userName}</p>
            </span>
          </Link>  
              <div className="trash">
          {session === question.userId ? <img src={trash} alt="trash" className="trash" onClick={deleteQuestion}></img> : ""}
          </div>
          </div>
          
          <div className="secondCol">
            <img src={question.imagePath} alt="contentImage"></img>
            
            <Link to={`/question/${question.id}`} className="link2">
            <div className="textContainer">
              <p>{question.description}</p>
            </div>
          </Link> 
          {session === question.userId ? <Button className="btn" href={`/editQuestion/${question.id}`}>Edit question</Button> : ""}
          </div>         

        </PostDiv>

      </div>
    );
  } else content = "";

  return content;
};

export default Question;
