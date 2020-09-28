import React, { createContext, useState } from "react";

export const UserSession = createContext();

export const UserSessionProvider = (props) => {
  const setLocalStorageSession = (session) => localStorage.setItem("session", session);
  const setLocalStorageUsername = (username) => localStorage.setItem("username", username);
  const setLocalStorageHobbies = (hobbies) => localStorage.setItem("hobbies", hobbies);
  const [session, setSession] = useState(parseInt(localStorage.getItem("session")));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [hobbies, setHobbies] = useState(localStorage.getItem("hobbies"));
  return (
    <UserSession.Provider
      value={[
        [session, setSession],
        [username, setUsername],
        [hobbies, setHobbies],
      ]}
    >
      {props.children}
    </UserSession.Provider>
  );
};
