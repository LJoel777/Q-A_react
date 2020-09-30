import React, { useContext } from "react";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Comment = styled.div`
  input {
    background: #fff;
    border-radius: 5px;
    font-size: 16px;
  }

  form {
    margin-bottom: 30px;
    padding: 10px;
  }
`;

const AddComment = (props) => {
  const session = useContext(UserSession)[0][0];
  const id = props.id;
  const { register, handleSubmit } = useForm();
  const setRefresh = props.setRefresh;

  const postData = (data) => {
    if (data.description.length > 0) {
      const answer = {
        postId: id,
        description: data.description,
        imagePath: data.imagePath,
        userId: session,
      };
      return axios.post(`http://localhost:8080/answer/add`, answer).then(() => setRefresh(true));
    } else alert("Please fill the description field!");
  };

  return (
    <Comment>
      <form onSubmit={handleSubmit(postData)}>
        <input name="description" ref={register} placeholder="Description..." />
        <input name="imagePath" ref={register} placeholder="ImagePath..." />
        <input type="submit" />
      </form>
    </Comment>
  );
};

export default AddComment;
