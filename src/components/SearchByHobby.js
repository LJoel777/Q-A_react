import React, { useState, useContext } from "react";
import { UserSession } from "../context/UserSession";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router";

const SearchBar = styled.div`
  padding-right: 15px;
  input {
    border-radius: 10px;
    padding: 5px;
    background: #1c1e21;
    border: none;
    color: white;
    ::placeholder {
      color: #999797;
    }
  }
`;

function SearchByHobby() {
  const session = useContext(UserSession)[0][0];
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState([]);
  const [hobby, setHobby] = useState("");

  const checkField = (e) => {
    setRedirect(false);
    if (e.key === "Enter") {
      axios.get(`http://localhost:8080/search/topic/${session}?topic=${hobby}`).then((res) => {
        setResult(res.data);
        setRedirect(true);
        setHobby("");
      });
    }
  };

  return (
    <SearchBar>
      <input value={hobby} placeholder="Search by hobby name..." onChange={(e) => setHobby(e.target.value)} onKeyDown={checkField} />
      {redirect ? (
        <Redirect
          to={{
            pathname: "/questionsBySearchResult",
            state: { result: result },
          }}
        />
      ) : (
        ""
      )}
    </SearchBar>
  );
}

export default SearchByHobby;
