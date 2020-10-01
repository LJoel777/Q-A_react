import React, { useContext, useState } from "react";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import FormDiv from "../style/form";
import { setToken } from "../helpers/LocalStorageService";
import { setLocalStorageHobbies, setLocalStorageUsername, setLocalStorageSession } from "../helpers/LocalStorageService";

const Login = (props) => {
  const setSession = useContext(UserSession)[0][1];
  const [username, setUsername] = useContext(UserSession)[1];
  const setHobbies = useContext(UserSession)[2][1];
  const [password, setPassword] = useState("");

  const setEmailOnChange = (e) => {
    setUsername(e.target.value);
  };

  const setPasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const checkFields = (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      postData();
    } else {
      alert("Please fill the title and description field!");
    }
  };

  const postData = () => {
    const login = {
      username: username,
      password: password,
    };
    return axios
      .post("http://localhost:8080/login", login)
      .then((res) => {
        console.log(res.data);
        setToken(res.data.token);
        setLocalStorageSession(res.data.user.id);
        setLocalStorageUsername(res.data.user.username);
        setLocalStorageHobbies(res.data.user.fieldsOfInterests);
        setHobbies(res.data.user.fieldsOfInterests);
        setUsername(res.data.user.username);
        setSession(res.data.user.id);
        props.history.push("/");
      })
      .catch((error) => alert("Wrong password or email!"));
  };

  return (
    <FormDiv>
      <input id="title" placeholder="Username..." onChange={setEmailOnChange} />
      <input id="description" placeholder="Password..." type="password" onChange={setPasswordOnChange} />
      <button name="submit" onClick={checkFields}>
        Log in
      </button>
    </FormDiv>
  );
};
export default Login;
