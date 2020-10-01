import React from "react";
import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CTX } from "./Store";
import { UserSession } from "../context/UserSession";
import axios from "axios";
import { MessageContext } from "../context/MessageContext";
import io from "socket.io-client";
import firebase from 'firebase';
import {db} from'../Firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    margin: "50px",
    padding: theme.spacing(3, 2),
    background: "white",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey",
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
    overflow: "hidden",
    overflowY: "scroll",
  },
  chatBox: {
    width: "80%",
  },
  button: {
    width: "15%",
  },
}));

export default function Chat() {
  const [render, setRender] = useState(false);
  const [readError,setReadError] = useState(null)
  const [writeError,setWriteError] = useState(null)
  const [chats,setChats] = useState([]);
  const username = useContext(UserSession)[1][0];
  const classes = useStyles();
  const [allChats, setAllChats] = useContext(MessageContext)[0];
  const sendChatAction = useContext(CTX).sendChatAction;
  const topics = useContext(UserSession)[2][0];
  const [timestamp, setTimestamp] = useState(0);
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
