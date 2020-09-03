import React, { useContext } from "react";
import { UserSession } from "../context/UserSession";
import PostByUser from "./PostsByUser";
import styled from "styled-components";

const UserPosts = styled.div`
  .postsTitle {
    margin-left: 13%;
  }
`;

export default function UserPost() {
  const id = useContext(UserSession)[0];
  return (
    <UserPosts>
      <h1 className="postsTitle">Posts:</h1>
      <PostByUser id={id} />
    </UserPosts>
  );
}
