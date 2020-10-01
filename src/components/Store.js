import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import { MessageContext } from "../context/MessageContext";
import axios from "axios";

export const CTX = React.createContext();

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
  console.log(value)
}

function Store(props) {
  const activeTopic = useContext(MessageContext)[1][0];
  const [initState, setInitState] = useContext(MessageContext)[0];

  // useEffect(() => {
  //   if (activeTopic !== "") {
  //     console.log(activeTopic);
  //     axios.get(`http://localhost:8080/get-messages/${activeTopic}`).then((res) => {
  //       setInitState(res.data);
  //       console.log(JSON.stringify(res.data) + "RESDATA")
  //     });
  //   }
  // }, [activeTopic]);

  // useEffect(() => {
  //   if (!socket) {
  //     socket = io(":3001");
  //     socket.on(
  //       "chat message",
  //       function (msg) {
  //         console.log(msg);
  //         let newArr = [...initState];
  //         console.log("Laci")
  //         console.log(newArr);
  //         newArr.push({ username: msg.username, msg: msg.msg });
  //         setInitState(newArr);
  //       },
  //     );
  //   }
  // },[initState]);

  return <CTX.Provider value={{ sendChatAction }}>{props.children}</CTX.Provider>;
}
export default Store;
