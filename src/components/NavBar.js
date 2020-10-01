import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserSession } from "../context/UserSession";
import Logo from "../images/logo.png";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { Tooltip } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import NotificationList from "./NotificationList";

const NavDiv = styled.div`
  background-color: #333;
  display: flex;
  .link {
    font-size: 20px;
    float: left;
    color: #f50057;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
`;

const NavBar = () => {
  const [session, setSession] = useContext(UserSession)[0];
  const username = useContext(UserSession)[1];
  let content = "";

  const logOut = () => {
    localStorage.setItem("session", null);
    localStorage.setItem("username", null);
    localStorage.setItem("hobbies", null);
    localStorage.removeItem("token");
    localStorage.setItem("session", null);
    setSession(localStorage.getItem("session"));
  };

  if (isNaN(session)) {
    content = (
      <div className="navBar">
        <div className="logo">
          <img className="logo" alt="" src={Logo} />
        </div>
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
      <div className="navBar">
        <div className="logo">
          <Link className="link" to="/">
            <img className="logo" alt="" src={Logo} />
          </Link>
        </div>
        <Link className="link" to={`/user/${session}`}>
          {username}
        </Link>
        <Link className="link" to="/friend-news">
          <Tooltip title="News by friends">
            <PeopleAltIcon color="secondary" fontSize="large"></PeopleAltIcon>
          </Tooltip>
        </Link>
        <Tooltip title="Notifications">
          <NotificationList />
        </Tooltip>
        <Link className="link" to={""} onClick={logOut}>
          <Tooltip title="Logout">
            <PowerSettingsNewIcon color="secondary" fontSize="large" />
          </Tooltip>
        </Link>
      </div>
    );
  }

  return <NavDiv>{content}</NavDiv>;
};

export default NavBar;
