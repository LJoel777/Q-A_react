import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import { MessageContext } from "../context/MessageContext";

export const CTX = React.createContext();

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

function Store(props) {
  const [initState, setInitState] = useContext(MessageContext)[0];

  useEffect(() => {
    if (!socket) {
      socket = io(":3001");
      socket.on(
        "chat message",
        function (msg) {
          let newArr = [...initState];
          console.log(newArr);
          newArr.push({ username: msg.username, msg: msg.msg, topic: msg.topic });
          setInitState(newArr);
        },
        [initState]
      );
    }
  }, [initState, setInitState]);

  return <CTX.Provider value={{ sendChatAction }}>{props.children}</CTX.Provider>;
}
export default Store;
