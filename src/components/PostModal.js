import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

const Post = styled.div`
  .btn {
    background: rgba(0, 0, 0, 0);
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 60%;
    border: none;
  }
  .btn .textarea {
    position: relative;
    z-index: 20;
    opacity: 1;
    width: 100%;
  }
  .btn .textarea textarea {
    background: #333;
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    color: white;
    border-radius: 5px;
    border: none;
  }
  .myModal {
    background: black;
  }
`;

const PostModal = (props) => {
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setHobbiesOnChange = (e) => {
    setHobbies(e.target.value);
  };

  const setDescriptionOnChange = (e) => {
    setDescription(e.target.value);
  };

  const setImagePathOnChange = (e) => {
    setImagePath(e.target.value);
  };

  if (!props.isLoading && !isNaN(props.session)) {
    const checkFields = (e) => {
      e.preventDefault();
      if (description.length > 0 && hobbies.length > 0) {
        const question = {
          userId: props.session,
          description: description,
          categories: hobbies.replace(/\s/g, "").split(","),
          imagePath: imagePath,
        };
        return axios.post("http://localhost:8080/post/add", question).then((res) => {
          props.history.push(`/question/${res.data}`);
        });
      } else alert("Please fill the tags and description field!");
    };

    return (
      <Post className="postModal">
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
    );
  }
};

export default PostModal;
