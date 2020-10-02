import React, { createContext, useState, useContext } from "react";
import { UserSession } from "./UserSession";

export const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const topics = useContext(UserSession)[2][0];
  const [initState, setInitState] = useState([]);
  const [activeTopic, changeActiveTopic] = useState(String(topics).replace(/\s/g, "").split(",")[0]);
  return (
    <MessageContext.Provider
      value={[
        [initState, setInitState],
        [activeTopic, changeActiveTopic],
      ]}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
