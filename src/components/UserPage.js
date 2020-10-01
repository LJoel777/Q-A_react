import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { UserSession } from "../context/UserSession";
import Settings from "./Settings";
import UserPost from "./UserPost";
import { Button } from "react-bootstrap";

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
  const session = useContext(UserSession)[0][0];
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/user/${id}`).then((res) => {
      setUserName(res.data.userName);
      setProfilePicture(res.data.profilePicture);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
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
          {parseInt(id) !== session ? (
            !friendIdList.includes(session) ? (
              <Button type="button" className="setFriend" onClick={handleFriend}>
                Set friend
              </Button>
            ) : (
              <Button type="button" className="setFriend" onClick={handleRemoveFriend}>
                Remove friend
              </Button>
            )
          ) : (
            <Settings history={props.history} />
          )}
          <hr />
        </UseData>
        <UserPost id={id} history={props.history} />
      </div>
    );
  } else content = "Loading...";

  return content;
};

export default UserPage;
