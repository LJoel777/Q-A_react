import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserSession } from "../context/UserSession";
import axios from "axios";

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
  const [session, setSession] = useContext(UserSession);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${session}`).then((res) => {
      setUserName(res.data.userName);
    });
  });

  const logOut = () => {
    setSession(null);
  };

  return (
    <NavDiv>
      <Link className="link" to="/">
        HOME
      </Link>
      <Link className="link" to="/addQuestion">
        Ask Question
      </Link>
      {session === null ? (
        <Link className="link" to="/login">
          Login
        </Link>
      ) : (
        <Link className="link" to={""} onClick={logOut}>
          Logout
        </Link>
      )}
      {session === null ? (
        <Link className="link" to="/registration">
          Register
        </Link>
      ) : (
        ""
      )}
      {session === null ? (
        ""
      ) : (
        <Link className="link" to={`/user/${session}`}>
          {userName}
        </Link>
      )}
    </NavDiv>
  );
};

export default NavBar;
