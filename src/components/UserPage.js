import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { UserSession } from "../context/UserSession";
import Settings from "./Settings";
import UserPost from "./UserPost";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';


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
  h1 {
    color: white;
  }
  h3 {
    color: white;
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
  .setFriend {
    width: 150px;
    font-size: 20px;
    text-align: center;
    margin-left: 20px;
  }
`;





const UserPage = (props) => {
  const id = props.match.params.id;
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [friendIdList, setFriendIdList] = useState([]);
  const [session,setSession] = useContext(UserSession)[0];
  let content = "";

  const logOut = () => {
    localStorage.setItem("session", null);
    localStorage.setItem("username", null);
    localStorage.setItem("hobbies", null);
    localStorage.removeItem("token");
    localStorage.setItem("session", null);
    setSession(localStorage.getItem("session"));
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/user/${id}`).then((res) => {
      setUserName(res.data.userName);
      setProfilePicture(res.data.profilePicture);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      console.log(res.data);
      setFriendIdList(
        res.data.friends.map((friend) => {
          return friend;
        })
      );
      setIsLoading(false);
    });
  }, [id]);

  const handleFriend = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/user/${id}/add-friend/${session}`).then((res) => {
      setFriendIdList(res.data);
      console.log(res.data);
    });
  };

  const handleRemoveFriend = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/user/${id}/remove-friend/${session}`).then((res) => {
      setFriendIdList(res.data);
      console.log(res.data);
    });
  };

  if (!isLoading) {
    content = (
      <div className="userContainer">
          <div className="profileSide">
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
              <Link className="link" to="/chat">
                <ChatBubbleIcon color="secondary" fontSize="large" />
                <p>Chat</p>
              </Link>
            </li>
            <li>
              <Link className="link" to={""} onClick={logOut}>
                <PowerSettingsNewIcon color="secondary" fontSize="large" />
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
        <UseData className="userData">
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
          <div className="profileButtons">
          {parseInt(id) !== session ? (
            !friendIdList.includes(session) ? (
             <PersonAddIcon color="secondary" fontSize="large" onClick={handleFriend}/>
            ) : (
          <PersonAddDisabledIcon color="secondary" fontSize="large" onClick={handleRemoveFriend} />
            )
          ) : (
            <Settings history={props.history} />
          )}
          </div>
          <hr />
          <UserPost id={id} />
        </UseData>
       <div className="sideChat">
         <ul>
           <li></li>
         </ul>
       </div>
        </div>
    );
  } else content = "Loading...";

  return content;
};

export default UserPage;
