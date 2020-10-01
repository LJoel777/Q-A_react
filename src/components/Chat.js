import React, { useCallback } from "react";
import { useState, useContext, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { CTX } from "./Store";
import { UserSession } from "../context/UserSession";
import axios from "axios";
import { MessageContext } from "../context/MessageContext";
import io from "socket.io-client";
import firebase from 'firebase';
import {db} from'../Firebase';
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
  const [readError,setReadError] = useState(null)
  const [writeError,setWriteError] = useState(null)
  const [chats,setChats] = useState([]);
  const username = useContext(UserSession)[1][0];
  const [allChats, setAllChats] = useContext(MessageContext)[0];
  const sendChatAction = useContext(CTX).sendChatAction;
  const topics = useContext(UserSession)[2][0];
  const [textValue, changeTextValue] = useState("");
  const [activeTopic, changeActiveTopic] = useContext(MessageContext)[1];
  const session = useContext(UserSession)[0][0];

  


  const  handleSubmit = (e) =>{
     db.collection('chat').add({
       message: textValue,
       timestamp: Date.now(),
       topic:activeTopic,
       username: username,
     })
    changeTextValue("");
  }


  let content;
  let socket;


useEffect(()=>{
    db.collection('chat')
    .where('topic','==',activeTopic)
    .orderBy('timestamp','asc')
    .onSnapshot(snapshot =>{
        setChats(snapshot.docs.map(doc => doc.data()))
        console.log(chats)
    })
},[activeTopic])



const handleChange = (e)=>{
  changeTextValue(e.target.value);
}

const setTopic = (e)=>{
  changeActiveTopic(e.target.innerText)
}


  const checkKey = (e) => {
    if (e.key === "Enter") {

    }
  };

    return (
         <div className={classes.root}>
        <Paper elevation={0} />
        <Typography variant="h4" component="h3">
          Chat app
        </Typography>
        <Typography variant="h5" component="p">
          {activeTopic}
        </Typography>

        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {String(topics)
                .replace(/\s/g, "")
                .split(",")
                .map((topic) => {
                  return (
                    <ListItem onClick={setTopic} key={topic} button>
                      <ListItemText primary={topic} />
                    </ListItem>
                  );
                })}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {chats.map((chat, i) => {
              return (
                <div className={classes.flex} key={i}>
                  <Chip label={chat.username} />
                  <Typography variant="body1" gutterBottom>
                    {chat.message}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField label="Send a chat" className={classes.chatBox} value={textValue} onChange={(e) => changeTextValue(e.target.value)} onKeyDown={checkKey} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
                handleSubmit();
            }}
          >
            Send
          </Button>
        </div>
        <Paper />
      </div>
    )

}
