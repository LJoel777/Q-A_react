import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormDiv = styled.div``;

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");

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
      title: title,
      description: description,
      imagePath: imagePath,
    };
    if (title.length > 0 && description.length > 0) {
      axios.post("http://localhost:8080/question/add", question);
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
