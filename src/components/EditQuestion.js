import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FormDiv from "../style/form";
import { UserSession } from "../context/UserSession";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

const Edit = styled.form`
  padding: 0px;
  margin: 0px;
  p {
    margin-bottom: 0px;
  }
`;

const EditQuestion = (props) => {
  const session = useContext(UserSession)[0][0];
  const id = props.id;
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/post/${id}/${session}`).then((res) => {
      setDescription(res.data.description);
      setImagePath(res.data.imagePath);
      setIsLoading(false);
    });
  }, [id, session]);

  const setDescriptionOnChange = (e) => {
    setDescription(e.target.value);
  };

  const setImagePathOnChange = (e) => {
    setImagePath(e.target.value);
  };

  const checkFields = (e) => {
    console.log(e.target);
    e.preventDefault();
    if (description.length > 0) {
      postData();
    } else alert("Please fill!");
  };

  const postData = () => {
    const question = {
      description: description,
      imagePath: imagePath,
    };
    return axios.post(`http://localhost:8080/post/${id}/update`, question).then((res) => {
      setShow(false);
      props.history.push(`/question/${id}`);
    });
  };

  if (!isLoading) {
    content = (
      <Edit>
        <p onClick={() => setShow(true)}>Edit</p>
        <Modal className="myModal" show={show} onHide={handleClose}>
          <FormDiv>
            <input value={description} type="input" id="description" placeholder="Description..." onChange={setDescriptionOnChange} />
            <input value={imagePath} type="text" id="imagePath" placeholder="ImagePath..." onChange={setImagePathOnChange} />
            <button name="submit" onClick={checkFields}>
              Submit
            </button>
          </FormDiv>
        </Modal>
      </Edit>
    );
  } else content = "Loading...";

  return content;
};

export default EditQuestion;
