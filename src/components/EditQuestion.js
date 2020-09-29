import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FormDiv from "../style/form";
import { UserSession } from "../context/UserSession";

const EditQuestion = (props) => {
  const session = useContext(UserSession)[0][0];
  const id = props.match.params.id;
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
    return axios
      .post(`http://localhost:8080/post/${id}/update`, question)
      .then((res) => {
        props.history.push(`/question/${id}`);
      });
  };

  if (!isLoading) {
    content = (
      <FormDiv>
        <input
          value={description}
          id="description"
          placeholder="Description..."
          onChange={setDescriptionOnChange}
        />
        <input
          value={imagePath}
          id="imagePath"
          placeholder="ImagePath..."
          onChange={setImagePathOnChange}
        />
        <button name="submit" onClick={checkFields}>
          Submit
        </button>
      </FormDiv>
    );
  } else content = "Loading...";

  return content;
};

export default EditQuestion;
