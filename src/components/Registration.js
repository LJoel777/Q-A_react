import React, { useState } from "react";
import axios from "axios";
import FormDiv from "../style/form";

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
      <input id="firstName" placeholder="First Name" onChange={setFirstNameOnChange} />
      <input id="lastName" placeholder="Last Name" onChange={setLastNameOnChange} />
      <input id="userName" placeholder="Username" onChange={setUserNameOnChange} />
      <input id="email" placeholder="Email..." onChange={setEmailOnChange} />
      <input id="password" placeholder="Password..." type="password" onChange={setPasswordOnChange} />
      <input id="hobbies" placeholder="Hobbies" onChange={setHobbiesOnChange} />
      <input id="profilePicture" placeholder="Profile picture" onChange={setProfilePictureOnChange} />
      <button name="submit" onClick={checkFields}>
        Register
      </button>
    </FormDiv>
  );
};
export default Register;
