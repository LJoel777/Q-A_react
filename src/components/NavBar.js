import React, { useEffect, useContext,useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import NotificationsIcon from '@material-ui/icons/Notifications';

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
  const [username, setUsername] = useContext(UserSession)[1];
  const [isLoading, setIsLoading] = useState(true);

  let content = "";

  useEffect(() => {
    setIsLoading(true)
    if (!isNaN(session)) {
      axios.get(`http://localhost:8080/user/${session}`).then((res) => {
        setUsername(res.data.username);
        setIsLoading(false)
      });
    }
  }, [session, setUsername]);

  const logOut = () => {
    localStorage.setItem("session", null);
    localStorage.setItem("username", null);
    localStorage.setItem("hobbies", null);
    localStorage.removeItem("token");
    localStorage.setItem("session", null);
    setSession(localStorage.getItem("session"));
  };




  if (isNaN(session) || (!isLoading)) {
    content = (
      <div className="navBar">
        <Link className="link" to="/login">
          Login
        </Link>
        <Link className="link" to="/registration">
          Registration
        </Link>
      </div>
    );
  } else {
    console.log("ÉN VAGYOK A NAVBAR")
    content = (
      <div className="navBar">
        <div className="logo">
          <Link className="link" to="/">
            <img className="logo" src={Logo} />
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
        <Link>
        <Tooltip title="Notifications">
          <NotificationList/>
        </Tooltip>
        </Link>
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
