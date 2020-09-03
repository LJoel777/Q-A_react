import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { UserSession } from "../context/UserSession";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Settings from "./Settings";
import UserPost from "./UserPost";

const UseData = styled.div`
  .imageContainer {
    margin: auto;
    margin-top: 20px;
    border-radius: 50%;
    background: #d2d5da;
    width: 30%;
    max-width: 200px;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .infoContainer {
    text-align: center;
  }

  .nameContainer {
    margin: auto;
    text-align: center;
  }
  hr {
    width: 90%;
    text-align: center;
  }
`;

const UserPage = (props) => {
  const id = props.match.params.id;
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSetting, setIsSetting] = useState(false);
  const session = useContext(UserSession)[0];
  const [value, setValue] = useState("Set hobbies");
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/user/${id}`).then((res) => {
      setUserName(res.data.userName);
      setProfilePicture(res.data.profilePicture);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setIsLoading(false);
    });
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!isSetting) {
      setValue("See posts");
    } else {
      setValue("Set hobbies");
    }
    setIsSetting(!isSetting);
  };

  const handleFriend = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/user/${id}/add-friend/${session}`);
  };

  if (!isLoading) {
    if (parseInt(id) !== session) {
      content = (
        <div>
          <UseData>
            <div className="imageContainer">
              <img src={profilePicture} alt="profilePicture" />
            </div>
            <div className="nameContainer">
              <h1>{userName}</h1>
            </div>
            <div className="infoContainer">
              <h1>Personal Details:</h1>
              <h3>
                Name: {firstName} {lastName}
              </h3>
            </div>
            <input type="button" value="Set as friend" onClick={handleFriend} />
            <hr />
          </UseData>
          <UserPost />
        </div>
      );
    } else {
      content = (
        <div>
          <Router>
            <UseData>
              <div className="imageContainer">
                <img src={profilePicture} alt="profilePicture" />
              </div>
              <div className="nameContainer">
                <h1>{userName}</h1>
              </div>
              <div className="infoContainer">
                <h1>Personal Details:</h1>
                <h3>
                  Name: {firstName} {lastName}
                </h3>
              </div>
              <hr />
            </UseData>
            <input type="button" onClick={handleClick} value={value} />
            <Route
              exact
              path="/user/:id"
              component={!isSetting ? UserPost : Settings}
            />
          </Router>
        </div>
      );
    }
  } else content = "Loading...";

  return content;
};

export default UserPage;
