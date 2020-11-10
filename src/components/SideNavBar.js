import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const SideNavBarDiv = styled.div`
  min-width: 170px;
  margin-left: -40px;
  flex-grow: 1;
  li p {
    display: inline-flex;
    margin: 10px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;
function SideNavBar() {
  const [session, setSession] = useContext(UserSession)[0];

  const logOut = () => {
    localStorage.setItem("session", null);
    localStorage.setItem("username", null);
    localStorage.setItem("hobbies", null);
    localStorage.removeItem("token");
    localStorage.setItem("session", null);
    setSession(localStorage.getItem("session"));
  };

  return (
    <SideNavBarDiv>
      <ul>
        <li>
          <Link className="link" to={`/user/${session}`}>
            <PersonIcon color="secondary" fontSize="large" />
            <p>Profile</p>
          </Link>
        </li>
        <li>
          <Link className="link" to="/">
            <HomeIcon color="secondary" fontSize="large" />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link className="link" to={""} onClick={logOut}>
            <PowerSettingsNewIcon color="secondary" fontSize="large" />
            <p>Logout</p>
          </Link>
        </li>
      </ul>
    </SideNavBarDiv>
  );
}

export default SideNavBar;
