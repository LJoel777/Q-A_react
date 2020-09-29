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
  const username = useContext(UserSession)[1][0];
  const classes = useStyles();
  const [allChats, setAllChats] = useContext(MessageContext)[0];
  const sendChatAction = useContext(CTX).sendChatAction;
  const topics = useContext(UserSession)[2][0];
  const [textValue, changeTextValue] = useState("");
  const [activeTopic, changeActiveTopic] = useContext(MessageContext)[1];
  let content;

  useEffect(() => {
    axios.get(`http://localhost:8080/message/get-messages/${activeTopic}`).then((res) => {
      setAllChats(res.data);
      setRender(false);
      console.log(topics);
    });
  }, [activeTopic, render, setAllChats, topics]);

  const checkKey = (e) => {
    if (e.key === "Enter") {
      let message = { username: `${username}`, msg: textValue, topic: activeTopic };
      sendChatAction({ username: `${username}`, msg: textValue });
      changeTextValue("");
      axios.post("http://localhost:8080/message/send-message", message).then(() => {
        setRender(true);
      });
    }
  };

  if (allChats.length > 0) {
    content = (
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
                    <ListItem onClick={(e) => changeActiveTopic(e.target.innerText)} key={topic} button>
                      <ListItemText primary={topic} />
                    </ListItem>
                  );
                })}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats.map((chat, i) => {
              return (
                <div className={classes.flex} key={i}>
                  <Chip label={chat.username} />
                  <Typography variant="body1" gutterBottom>
                    {chat.msg}
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
              let message = { username: `${username}`, msg: textValue, topic: activeTopic };
              sendChatAction({ username: `${username}`, msg: textValue });
              changeTextValue("");
              axios.post("http://localhost:8080/message/send-message", message).then(() => {
                setRender(true);
              });
            }}
          >
            Send
          </Button>
        </div>
        <Paper />
      </div>
    );
  } else {
    content = "";
  }

  return content;
}
