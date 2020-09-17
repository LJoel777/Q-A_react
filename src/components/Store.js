import React, { useReducer, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { MessageContext } from "../context/MessageContext";
import axios from "axios";

export const CTX = React.createContext();

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

function Store(props) {
  const activeTopic = useContext(MessageContext)[1][0];
  const [initState, setInitState] = useContext(MessageContext)[0];
  // const [allChats, dispatch] = useReducer(reducer, initState);
  // function reducer(state, action) {
  //   const { msg, username } = action.payload;
  //   switch (action.type) {
  //     case "RECEIVE_MESSAGE":
  //       let newArr = [...initState];
  //       newArr.push({ username, msg });
  //       setInitState(newArr);
  //       return newArr;
  //     default:
  //       return state;
  //   }
  // }

  useEffect(() => {
    if (activeTopic !== "") {
      console.log(activeTopic);
      axios.get(`http://localhost:8080/get-messages/${activeTopic}`).then((res) => {
        setInitState(res.data);
      });
    }
  }, [activeTopic, setInitState]);

  useEffect(() => {
    if (!socket) {
      socket = io(":3001");
      socket.on(
        "chat message",
        function (msg) {
          console.log(initState);
          let newArr = [...initState];
          console.log(newArr);
          newArr.push({ username: msg.username, msg: msg.msg });
          // console.log(newArr);
          setInitState(newArr);
          // dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
        },
        [initState]
      );
    }
  });

  return <CTX.Provider value={{ sendChatAction }}>{props.children}</CTX.Provider>;
}
export default Store;
