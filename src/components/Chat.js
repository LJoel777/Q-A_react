import React, { useCallback } from "react";
import { useState, useContext, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { CTX } from "./Store";
import { UserSession } from "../context/UserSession";
import axios from "axios";
import { MessageContext } from "../context/MessageContext";
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

export default function Chat(props) {
  const [render, setRender] = useState(false);
  const username = useContext(UserSession)[1][0];
  const [allChats, setAllChats] = useContext(MessageContext)[0];
  const sendChatAction = useContext(CTX).sendChatAction;
  const topics = useContext(UserSession)[2][0];
  const [textValue, changeTextValue] = useState("");
  const [activeTopic, changeActiveTopic] = useContext(MessageContext)[1];
  const setShow = props.setShowChat;
  const show = props.show;
  const stableSetter = useCallback(() => setAllChats(), [setAllChats]);
  let content;
  useEffect(() => {
    axios.get(`http://localhost:8080/message/get-messages/${activeTopic}`).then((res) => {
      setAllChats(res.data);
      setRender(false);
    });
  }, [activeTopic, setAllChats, stableSetter]);

  const checkKey = (e) => {
    if (e.key === "Enter") {
      let message = { username: `${username}`, msg: textValue, topic: activeTopic };
      sendChatAction({ username: `${username}`, msg: textValue, topic: activeTopic });
      changeTextValue("");
      axios.post("http://localhost:8080/message/send-message", message).then(() => {
        setRender(true);
      });
    }
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
                    <Dropdown.Item onClick={(e) => changeActiveTopic(e.target.innerText)} key={topic} button>
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
            {allChats.length > 0 ? (
              allChats.map((chat, i) => {
                return (
                  <div className="content" key={i}>
                    <p className="username">{chat.username}</p>
                    <p className="message">{chat.msg}</p>
                  </div>
                );
              })
            ) : (
              <div className="content"></div>
            )}
          </div>
        </ScrollToBottom>
        <div className="send">
          <input placeholder="Message..." label="Send a chat" className="chatBox" value={textValue} onChange={(e) => changeTextValue(e.target.value)} onKeyDown={checkKey} />
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
