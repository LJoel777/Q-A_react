import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PostByUser from "./PostsByUser";

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
  h1{
    color:white
  }
  h3{
    color:white
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

const UserPosts = styled.div`
  .postsTitle {
    display:flex;
    color:white;
    margin-left: 13%;
  }
`;

const UserPage = (props) => {
  const id = props.match.params.id;
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
          <hr />
        </UseData>
        <UserPosts>
          <h1 className="postsTitle">Posts:</h1>
          <PostByUser id={id} />
        </UserPosts>
      </div>
    );
  } else content = "Loading...";

  return content;
};

export default UserPage;
