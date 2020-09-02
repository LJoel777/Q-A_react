import React, { useState } from "react";
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

const Register = (props) => {
  const [emailAddress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [hobbies, setHobbies] = useState("");

  const setEmailOnChange = (e) => {
    setEmailAdress(e.target.value);
  };

  const setPasswordOnChange = (e) => {
    setPassword(e.target.value);
  };
  const setFirstNameOnChange = (e) => {
    setFirstName(e.target.value);
  };
  const setLastNameOnChange = (e) => {
    setLastName(e.target.value);
  };
  const setUserNameOnChange = (e) => {
    setUserName(e.target.value);
  };
  const setProfilePictureOnChange = (e) => {
    setProfilePicture(e.target.value);
  };
  const setHobbiesOnChange = (e) => {
    setHobbies(e.target.value);
  };

  const checkFields = (e) => {
    e.preventDefault();
    const register = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      profilePicture: profilePicture,
      emailAddress: emailAddress,
      password: password,
      hobbies: hobbies,
    };
    if (emailAddress.length > 0 && password.length > 0) {
      axios.post("http://localhost:8080/registration", register).then((res) => {});
    } else {
      alert(password.length);
    }
  };

  return (
    <FormDiv>
      <input id="description" placeholder="First Name" onChange={setFirstNameOnChange} />
      <input id="description" placeholder="Last Name" onChange={setLastNameOnChange} />
      <input id="description" placeholder="Username" onChange={setUserNameOnChange} />
      <input id="title" placeholder="Email..." onChange={setEmailOnChange} />
      <input id="description" placeholder="Password..." type="password" onChange={setPasswordOnChange} />
      <input id="description" placeholder="Hobbies" onChange={setHobbiesOnChange} />
      <input id="description" placeholder="Profile picture" onChange={setProfilePictureOnChange} />
      <button name="submit" onClick={checkFields}>
        Register
      </button>
    </FormDiv>
  );
};
export default Register;
