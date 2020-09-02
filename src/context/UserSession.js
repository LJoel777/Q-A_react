import React, { createContext, useState } from "react";

export const UserSession = createContext();

export const UserSessionProvider = (props) => {
  const [session, setSession] = useState(localStorage.getItem("session"));
  return <UserSession.Provider value={[session, setSession]}>{props.children}</UserSession.Provider>;
};
