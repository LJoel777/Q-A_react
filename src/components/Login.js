import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserSession } from "../context/UserSession";

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

const Login = (props) => {
  const setSession = useContext(UserSession)[1];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setEmailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const checkFields = (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      postData();
    } else {
      alert("Please fill the title and description field!");
    }
  };

  const postData = () => {
    const login = {
      email: email,
      password: password,
    };
    return axios
      .post("http://localhost:8080/login", login)
      .then((res) => {
        if (res.data.valid) {
          localStorage.setItem("session", res.data.id);
          setSession(res.data.id);
          props.history.push("/");
        }
      })
      .catch((error) => alert("Wrong password or email"));
  };

  return (
    <FormDiv>
      <input id="title" placeholder="Email..." onChange={setEmailOnChange} />
      <input id="description" placeholder="Password..." type="password" onChange={setPasswordOnChange} />
      <button name="submit" onClick={checkFields}>
        Log in
      </button>
    </FormDiv>
  );
};
export default Login;
