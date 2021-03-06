import React, {useState, useContext} from "react";
import styled from "styled-components";
import axios from "axios";
import {UserSession} from "../context/UserSession";

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

const AddAnswer = (props) => {
    const [description, setDescription] = useState("");
    const [imagePath, setImagePath] = useState("");
    const session = parseInt(useContext(UserSession)[0]);

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
        const answer = {
            questionId: props.match.params.id,
            description: description,
            imagePath: imagePath,
            userId: session,
        };
        return axios.post(`http://localhost:8080/answer/add`, answer).then((res) => {
            props.history.push(`/question/${props.match.params.id}`);
        });
    };

    return (
        <FormDiv>
            <input id="description" placeholder="Description..." onChange={setDescriptionOnChange}/>
            <input id="imagePath" placeholder="ImagePath..." onChange={setImagePathOnChange}/>
            <button name="submit" onClick={checkFields}>
                Submit
            </button>
        </FormDiv>
    );
};

export default AddAnswer;
