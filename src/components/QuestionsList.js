import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';


const Container = styled.div``;

const QuestionsList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let content = "";

  useEffect(() => {
    setIsLoading(true);
    let url;
    if (props.match.path === "/" || props.match.path === "/hobby-news") {
      url = "http://localhost:8080/hobby-news/" + session;
    } else {
      url = "http://localhost:8080/friend-news/" + session;
    }
    if (session !== "null") {
      axios.get(url).then((res) => {
        console.log(res);
        setQuestions(res.data);
        setIsLoading(false);
      });
    }
  }, [session, props.match.path]);

  if (!isLoading && session !== "null") {
    content = (
      <div>
        <Button className="post" variant="primary" onClick={handleShow}>
          <textarea id="subject" name="rg" placeholder="Share your story"></textarea>
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <textarea className="postText" placeholder="Share your story...">
        </textarea>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
        Save Changes
        </Button>
        </Modal.Footer>
        </Modal>
        <LinkDiv>
          <Link className="link" to="/">
            News by hobbies
          </Link>
          <Link className="link" to="/friend-news">
            News by friends
          </Link>
        </LinkDiv>
        <Container className="col">
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </Container>
      </div>
    );
  } else if (session === "null") {
    props.history.push("/login");
  } else content = "Loading";

  return content;
};

const LinkDiv = styled.div`
  background-color: #333;
  overflow: hidden;
  .link {
    font-size: 20px;
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  .link:hover {
    background-color: #76d14f;
    color: black;
  }

  .link:active {
    background-color: #333;
    color: white;
  }
`;

export default QuestionsList;
