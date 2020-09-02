import React, { useContext, createContext,useState} from "react";

export const UserSession = createContext();

export const UserSessionProvider = (props)=>  {
  const [session , setSession] = useState(false);
  return <UserSession.Provider value={[session,setSession]}>{props.children}</UserSession.Provider>;
}