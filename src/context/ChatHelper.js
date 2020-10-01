import React, { createContext, useState } from "react";

export const ChatHelperContext = createContext();

export const ChatHelperProvider = (props) => {
  const [show, setShow] = useState("none");
  return <ChatHelperContext.Provider value={[show, setShow]}>{props.children}</ChatHelperContext.Provider>;
};
