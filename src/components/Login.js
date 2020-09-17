import React, { useContext, useState } from "react";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import FormDiv from "../style/form";

const Login = (props) => {
  const setSession = useContext(UserSession)[0][1];
  const setUsername = useContext(UserSession)[1][1];
  const setHobbies = useContext(UserSession)[2][1];
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
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("hobbies", res.data.hobbies);
          setSession(res.data.id);
          setUsername(res.data.username);
          setHobbies(res.data.hobbies);
          props.history.push("/");
        } else {
          alert("Wrong password or email!");
        }
      })
      .catch((error) => alert("Wrong password or email!"));
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
