import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserSession } from "../context/UserSession";
import axios from "axios";

const FormDiv = styled.div`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 40px;
  width: 80%;
  max-width: 1100px;
  margin: auto;
  margin-top: 50px;
  font-size: 20px;
  input {
    font-size: 20px;
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    font-size: 30px;
    width: 100%;
    background-color: black;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #76d14f;
    color: black;
  }
`;

const AddQuestion = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const session = useContext(UserSession)[0];

  const setTitleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const setDescriptionOnChange = (e) => {
    setDescription(e.target.value);
  };

  const setImagePathOnChange = (e) => {
    setImagePath(e.target.value);
  };

  const checkFields = (e) => {
    e.preventDefault();
    const question = {
      userId: session,
      title: title,
      description: description,
      imagePath: imagePath,
    };
    if (title.length > 0 && description.length > 0) {
      return axios.post("http://localhost:8080/question/add", question).then((res) => {
        props.history.push(`/question/${res.data}`);
      });
    } else alert("Please fill the title and description field!");
  };

  return (
    <FormDiv>
      <input id="title" placeholder="Title..." onChange={setTitleOnChange} />
      <input id="description" placeholder="Description..." onChange={setDescriptionOnChange} />
      <input id="imagePath" placeholder="ImagePath..." onChange={setImagePathOnChange} />
      <button name="submit" onClick={checkFields}>
        Submit
      </button>
    </FormDiv>
  );
};

export default AddQuestion;
