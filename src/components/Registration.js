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
  const [emailAddress, setEmailAddress] = useState("");
  const [psw, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [hobbies, setHobbies] = useState([]);

  const setEmailOnChange = (e) => {
    setEmailAddress(e.target.value);
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
      psw: psw,
      fieldsOfInterest: hobbies.replace(/\s/g, "").split(","),
    };
    if (emailAddress.length > 0 && psw.length > 0) {
      axios.post("http://localhost:8080/registration", register).then((res) => {
        props.history.push("/login");
      });
    } else {
      alert(psw.length);
    }
  };

  return (
    <FormDiv>
      <input
        id="firstName"
        placeholder="First Name"
        onChange={setFirstNameOnChange}
      />
      <input
        id="lastName"
        placeholder="Last Name"
        onChange={setLastNameOnChange}
      />
      <input
        id="userName"
        placeholder="Username"
        onChange={setUserNameOnChange}
      />
      <input id="email" placeholder="Email..." onChange={setEmailOnChange} />
      <input
        id="password"
        placeholder="Password..."
        type="password"
        onChange={setPasswordOnChange}
      />
      <input id="hobbies" placeholder="Hobbies" onChange={setHobbiesOnChange} />
      <input
        id="profilePicture"
        placeholder="Profile picture"
        onChange={setProfilePictureOnChange}
      />
      <button name="submit" onClick={checkFields}>
        Register
      </button>
    </FormDiv>
  );
};
export default Register;
