import React from "react";
import { useState } from "react";
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
  },
  chatBox: {
    width: "80%",
  },
  button: {
    width: "15%",
  },
}));

export default function Chat() {
  const classes = useStyles();
  // contextStore
  const { allChats, sendChatAction } = React.useContext(CTX);
  const topics = Object.keys(allChats);
  //    console.log(topics);
  console.log(Object.values(allChats));

  // localState
  const [textValue, changeTextValue] = useState("");
  const [activeTopic, changeActiveTopic] = useState(topics[0]);

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
            {topics.map((topic) => {
              return (
                <ListItem onClick={(e) => changeActiveTopic(e.target.innerText)} key={topic} button>
                  <ListItemText primary={topic} />
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {allChats[activeTopic].map((chat, i) => {
            return (
              <div className={classes.flex} key={i}>
                <Chip label={chat.from} />
                <Typography variant="body1" gutterBottom>
                  {chat.msg}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.flex}>
        <TextField label="Send a chat" className={classes.chatBox} value={textValue} onChange={(e) => changeTextValue(e.target.value)} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            sendChatAction({ from: "user", msg: textValue, topic: activeTopic });
            changeTextValue("");
          }}
        >
          Send
        </Button>
      </div>
      <Paper />
    </div>
  );
}
