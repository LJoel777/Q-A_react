import React, { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [initState, setInitState] = useState([]);
  const [activeTopic, changeActiveTopic] = useState("programing");
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
