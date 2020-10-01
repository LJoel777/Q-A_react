import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import EditComment from "./EditComment";
import { Dropdown } from "react-bootstrap";
import MoreHorizontIcon from "@material-ui/icons/MoreHoriz";

const AnswerDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #262626f7;
  border-radius: 10px;
  width: 100%;
  color: white;
  padding: 15px;
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 15px;
  position: relative;
  .img {
    width: 150px;
    height: 150px;
    border-radius: 5px;
  }
  .content {
    flex-direction: column;
    margin-left: 10px;
    display: flex;
    margin-top: -10px;
  }

  .footer {
    position: absolute;
    right: 0px;
    top: -3px;
  }
`;

const Answer = (props) => {
  const [answer, setAnswer] = useState(props.answer);
  const [deleted, setDeleted] = useState(false);
  const [username, setUsername] = useState("");
  const [showEditComment, setShowEditComment] = useState(false);
  const setRefresh = props.setRefresh;
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
        <div className="commentHeader">
          <Link to={`/user/${session}`} className="linkToProfile">
            <div className="profile">
              <img src={userProfilePicture} alt="profilePicture" className="profilePicture" />
            </div>
          </Link>
        </div>
        <div className="content">
          <p className="userName">{username}</p>
          <p className="description">{answer.description}</p>
          {answer.imagePath !== "" ? <img src={answer.imagePath} alt="" className="img" /> : " "}
        </div>
        <div className="footer">
          {parseInt(session) === answer.user.id ? (
            <Dropdown>
              <Dropdown.Toggle id="dropdownBtn">
                <MoreHorizontIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={deleteAnswer}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => setShowEditComment(true)}>Edit</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
          {showEditComment === true ? <EditComment id={answer.id} show={showEditComment} setShowModal={setShowEditComment.bind(this)} setRefresh={setRefresh.bind(this)} /> : ""}
        </div>
      </AnswerDiv>
    );
  } else content = "";

  return content;
};

export default Answer;
