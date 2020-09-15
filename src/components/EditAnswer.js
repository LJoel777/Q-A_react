import React, { useState, useEffect } from "react";
import axios from "axios";
import FormDiv from "../style/form";

const EditAnswer = (props) => {
  const id = props.match.params.id;
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/answer/${id}`).then((res) => {
      setDescription(res.data.description);
      setImagePath(res.data.imgPath);
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
    } else alert("Please fill the description field!");
  };

  const postData = () => {
    const answer = {
      description: description,
      imagePath: imagePath,
    };
    return axios.post(`http://localhost:8080/answer/${id}/update`, answer).then((res) => {
      props.history.push(`/question/${res.data}`);
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

export default EditAnswer;
