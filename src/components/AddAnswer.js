import React, { useState, useContext } from "react";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import FormDiv from "../style/form";

const AddAnswer = (props) => {
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const session = useContext(UserSession)[0][0];

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
      postId: props.match.params.id,
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
      <input id="description" placeholder="Description..." onChange={setDescriptionOnChange} />
      <input id="imagePath" placeholder="ImagePath..." onChange={setImagePathOnChange} />
      <button name="submit" onClick={checkFields}>
        Submit
      </button>
    </FormDiv>
  );
};

export default AddAnswer;
