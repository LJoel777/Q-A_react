import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavDiv = styled.div`
  background-color: #333;
  overflow: hidden;
  .link {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  .link:hover {
    background-color: #ddd;
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
      <Link className="link" to="/add">
        Ask Question
      </Link>
    </NavDiv>
  );
};

export default NavBar;
