import React from "react";
import PostByUser from "./PostsByUser";
import styled from "styled-components";

const UserPosts = styled.div`
  .postsTitle {
    margin-left: 13%;
  }
  h1 {
    color: white;
  }
`;

export default function UserPost(props) {
  const id = props.id ? props.id : props.match.params.id;
  return (
    <UserPosts>
      <h1 className="postsTitle">Posts:</h1>
      <PostByUser id={id} history={props.history} />
    </UserPosts>
  );
}
