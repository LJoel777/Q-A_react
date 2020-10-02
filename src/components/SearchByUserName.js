import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router";

const SearchBar = styled.div`
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

function SearchByUsername() {
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState([]);
  const [username, setUsername] = useState("");

  const checkField = (e) => {
    setRedirect(false);
    if (e.key === "Enter") {
      axios.get(`http://localhost:8080/search/friend?username=${username}`).then((res) => {
        setResult(res.data);
        setRedirect(true);
        setUsername("");
      });
    }
  };

  return (
    <SearchBar>
      <input value={username} placeholder="Search by username..." onChange={(e) => setUsername(e.target.value)} onKeyDown={checkField} />
      {redirect ? (
        <Redirect
          to={{
            pathname: `/user/${result}`,
          }}
        />
      ) : (
        ""
      )}
    </SearchBar>
  );
}

export default SearchByUsername;
