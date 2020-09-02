import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <NavDiv>
      <Link className="link" to="/">
        HOME
      </Link>
      <Link className="link" to="/addQuestion">
        Ask Question
      </Link>
      <Link className="link" to="/login">
        Login
      </Link>
      <Link className="link" to="/registration">
        Register
      </Link>
    </NavDiv>
  );
};

export default NavBar;
