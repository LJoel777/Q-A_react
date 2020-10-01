import React from "react";
import { useState, useContext, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { UserSession } from "../context/UserSession";
import { MessageContext } from "../context/MessageContext";
import { db } from "../Firebase";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import CloseIcon from "@material-ui/icons/Close";

const ChatDiv = styled.div`
  position: fixed;
  bottom: -50px;
  right: -30px;
  width: 400px;
  text-align: center;
  margin: 50px;
  padding: 3, 2;
  background: #1e1c1c;
  border: 0.1px solid #4d5258;
  color: white;
  border-radius: 5px;
  .flex {
    display: flex;
    align-items: center;
  }
  .header {
    display: flex;
    flex-direction: row;
    padding: 2px;
    background: #242222;
  }
  .chatWindow {
    display: block;
    width: 100%;
    height: 400px;
    padding: 20px;
  }
  .scroll {
    width: 400px;
    height: 400px;
  }
  .content {
    display: flex;
    flex-direction: row;
    margin-left: -10px;
    .username {
      margin-right: 10px;
      background: lightgray;
      border-radius: 10px;
      padding: 5px;
      color: black;
      height: fit-content;
    }
    .message {
      width: 250px;
      word-wrap: break-word;
      text-align: left;
    }
  }
  .send {
    display: flex;
    flex-direction: row;
    padding: 5px;
    background: #242222;
    .chatBox {
      border-radius: 10px;
      width: 30em;
    }
    .submit {
      font-weight: bold;
      border-radius: 10px;
      margin-left: 20px;
    }
  }
  .close {
    color: #f50057;
    font-size: 40px;
    margin-left: 240px;
  }

  #topicBtn {
    background: #f50057;
    color: white;
    font-weight: bold;
    border: none;
  }
`;
const ChatDivClosed = styled.div`
  position: fixed;
  bottom: -50px;
  right: -30px;
  width: 110px;
  text-align: center;
  margin: 50px;
  padding: 2px;
  background: #1e1c1c;
  border: 0.1px solid #4d5258;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

let unsub;


export default function Chat(props) {
  const [chats, setChats] = useState([]);
  const username = useContext(UserSession)[1][0];
  const topics = useContext(UserSession)[2][0];
  const [textValue, changeTextValue] = useState("");
  const [activeTopic, changeActiveTopic] = useContext(MessageContext)[1];
  const setShow = props.setShowChat;
  // const [unsub,setUnsub];
  const show = props.show;

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      db.collection("chat").add({
        message: textValue,
        timestamp: Date.now(),
        topic: activeTopic,
        username: username,
      });
      changeTextValue("");
    }
  };

  let content;

  useEffect(() => {
    console.log("UNSUBSCRIBE"+unsub);
    if(unsub){
      unsub();
    }
    console.log("activeTOPIC"+activeTopic);
    unsub = db.collection("chat")
      .where("topic", "==", activeTopic)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setChats(snapshot.docs.map((doc) => doc.data()));
      });
  }, [activeTopic]);

  const handleChange = (e) => {
    changeTextValue(e.target.value);
  };

  const setTopic = (e) => {
    changeActiveTopic(e.target.innerText);
  };

  if (show === "block") {
    content = (
      <ChatDiv style={{ display: show }}>
        <div className="header">
          <Dropdown id="dropDown">
            <Dropdown.Toggle id="topicBtn">{activeTopic}</Dropdown.Toggle>
            <Dropdown.Menu>
              {String(topics)
                .replace(/\s/g, "")
                .split(",")
                .map((topic) => {
                  return (
                    <Dropdown.Item onClick={setTopic} key={topic} button>
                      {topic}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
          <CloseIcon className="close" onClick={() => setShow("none")} />
        </div>

        <ScrollToBottom>
          <div className="chatWindow">
            {chats.length > 0 ? (
              chats.map((chat, i) => {
                return (
                  <div className="content" key={i}>
                    <p className="username">{chat.username}</p>
                    <p className="message">{chat.message}</p>
                  </div>
                );
              })
            ) : (
              <div className="content"></div>
            )}
          </div>
        </ScrollToBottom>
        <div className="send">
          <input placeholder="Message..." label="Send a chat" className="chatBox" value={textValue} onChange={handleChange} onKeyDown={handleSubmit} />
        </div>
        <Paper />
      </ChatDiv>
    );
  } else {
    content = (
      <ChatDivClosed className="closed" onClick={() => setShow("block")}>
        Chat <ChatBubbleIcon color="secondary" fontSize="large" />
      </ChatDivClosed>
    );
  }

  return content;
}
