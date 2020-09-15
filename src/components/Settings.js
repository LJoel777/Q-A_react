import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { UserSession } from "../context/UserSession";

const SettingsDiv = styled.div`
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

const Settings = (props) => {
  const [hobbies, setHobbies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0];
  let content = "";

  if (isNaN(session)) {
    props.history.push("/login");
  }

  const handleClick = (e) => {
    e.preventDefault();
    let data = {
      id: session,
      fieldsOfInterest: String(hobbies).replace(/\s/g, "").split(","),
    };
    return axios.post("http://localhost:8080/update-hobbies", data).then((res) => {
      console.log(data.userId);
      props.history.push(`/user/${session}`);
    });
  };

  const setValues = (e) => {
    e.preventDefault();
    setHobbies(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/user/${session}`).then((res) => {
      setHobbies(res.data.fieldsOfInterests);
      setIsLoading(false);
    });
  }, [session]);

  if (!isLoading) {
    content = (
      <SettingsDiv>
        <input type="text" value={String(hobbies)} onChange={setValues} />
        <input type="button" value="Submit" onClick={handleClick} />
      </SettingsDiv>
    );
  } else {
    content = "Loading";
  }

  return content;
};

export default Settings;
