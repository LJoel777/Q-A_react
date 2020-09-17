import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { UserSession } from "../context/UserSession";

const NavDiv = styled.div`
  background-color: #333;
  overflow: hidden;
  .link {
    font-size: 20px;
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  .link:hover {
    background-color: #76d14f;
    color: black;
  }

  .link:active {
    background-color: #333;
    color: white;
  }
`;

const NavBar = () => {
  const [session, setSession] = useContext(UserSession)[0];
  const [username, setUsername] = useContext(UserSession)[1];
  let content = "";

  useEffect(() => {
    if (!isNaN(session)) {
      axios.get(`http://localhost:8080/user/${session}`).then((res) => {
        setUsername(res.data.username);
      });
    }
  }, [session, setUsername]);

  const logOut = () => {
    localStorage.setItem("session", null);
    setSession(localStorage.getItem("session"));
  };

  if (isNaN(session)) {
    content = (
      <div>
        <Link className="link" to="/login">
          Login
        </Link>
        <Link className="link" to="/registration">
          Registration
        </Link>
      </div>
    );
  } else {
    content = (
      <div>
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/friend-news">
          News by friends
        </Link>
        <Link className="link" to={""} onClick={logOut}>
          Logout
        </Link>
        <Link className="link" to={`/user/${session}`}>
          {username}
        </Link>
        <Link className="link" to={`/chat`}>
          Chat
        </Link>
      </div>
    );
  }

  return <NavDiv>{content}</NavDiv>;
};

export default NavBar;
