import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const Container = styled.div``;

const QuestionsList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [hobbies, setHobbies] = useState([]);

  const setHobbiesOnChange = (e) => {
    setHobbies(e.target.value);
  };

  const setDescriptionOnChange = (e) => {
    setDescription(e.target.value);
  };

  const setImagePathOnChange = (e) => {
    setImagePath(e.target.value);
  };

  let content = "";

  useEffect(() => {
    setIsLoading(true);
    let url;
    if (props.match.path === "/" || props.match.path === "/hobby-news") {
      url = "http://localhost:8080/hobby-news/" + session;
    } else {
      url = "http://localhost:8080/friend-news/" + session;
    }
    if (!isNaN(session)) {
      axios.get(url).then((res) => {
        setQuestions(res.data);
        setIsLoading(false);
      });
    }
  }, [session, props.match.path]);

  if (!isLoading && !isNaN(session)) {
    const checkFields = (e) => {
      e.preventDefault();
      if (description.length > 0 && hobbies.length > 0) {
        const question = {
          userId: session,
          description: description,
          categories: hobbies.replace(/\s/g, "").split(","),
          imagePath: imagePath,
        };
        return axios.post("http://localhost:8080/question/add", question).then((res) => {
          console.log(props.history);
          props.history.push(`/question/${res.data}`);
        });
      } else alert("Please fill the tags and description field!");
    };
    content = (
      <div>
        <Post>
          <Button className="post" variant="primary" onClick={handleShow}>
            <div className="textarea">
              <textarea id="subject" name="rg" placeholder="Share your story..."></textarea>
            </div>
          </Button>

          <Modal className="myModal" show={show} onHide={handleClose}>
            <Modal.Body>
              <textarea className="postText" placeholder="Share your story..." onChange={setDescriptionOnChange}></textarea>
            </Modal.Body>
            <Modal.Footer>
              <input type="text" placeholder="Tags" onChange={setHobbiesOnChange} />
              <input type="text" placeholder="Image URL" onChange={setImagePathOnChange} />
              <Button variant="primary" name="submit" className="postButton" onClick={checkFields}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Post>
        <Container className="col">
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </Container>
      </div>
    );
  } else if (isNaN(session)) {
    props.history.push("/login");
  } else content = "Loading";
  return content;
};

const Post = styled.div`
  .btn {
    background: rgba(0, 0, 0, 0);
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 30%;
    border: none;
  }
  .btn .textarea {
    position: relative;
    z-index: 20;
    opacity: 1;
    width: 100%;
  }
  .btn .textarea textarea {
    background: white;
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    color: white;
    border-radius: 5px;
  }
  .myModal {
    background: black;
  }
`;
export default QuestionsList;
