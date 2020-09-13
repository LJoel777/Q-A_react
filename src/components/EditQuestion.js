import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const EditQuestion = (props) => {
  const id = props.match.params.id;
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/question/${id}`).then((res) => {
      setDescription(res.data.description);
      setImagePath(res.data.imagePath);
      setIsLoading(false);
    });
  }, [id]);

  const setDescriptionOnChange = (e) => {
    setDescription(e.target.value);
  };

  const setImagePathOnChange = (e) => {
    setImagePath(e.target.value);
  };

  const checkFields = (e) => {
    e.preventDefault();
    if (description.length > 0) {
      postData();
    } else alert("Please fill the title and description field!");
  };

  const postData = () => {
    const question = {
      description: description,
      imagePath: imagePath,
    };
    return axios.post(`http://localhost:8080/question/${id}/update`, question).then((res) => {
      props.history.push(`/question/${id}`);
    });
  };

  if (!isLoading) {
    content = (
      <FormDiv>
        <input value={description} id="description" placeholder="Description..." onChange={setDescriptionOnChange} />
        <input value={imagePath} id="imagePath" placeholder="ImagePath..." onChange={setImagePathOnChange} />
        <button name="submit" onClick={checkFields}>
          Submit
        </button>
      </FormDiv>
    );
  } else content = "Loading...";

  return content;
};

export default EditQuestion;
