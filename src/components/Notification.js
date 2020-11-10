import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import styled from "styled-components";

const NotificationDiv = styled.div`
  .notification {
    display: flex;
    flex-direction: row;
    width: 220px;
    padding: 5px;
  }
  .profilePicture {
    flex-grow: 1;
    border-radius: 50%;
    width: 50px;
    margin-top: 5px;
  }
  .icon {
    flex-grow: 1;
  }
  .message {
    flex-grow: 1;
  }
`;

const Notification = (props) => {
  const [senderPicure, setSenderPicture] = useState("");
  const [senderUsername, setSenderUsername] = useState("");
  const [senderId, setSenderId] = useState();
  const [notificationId, setNotificationId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0][0];
  const [deleteSelf, setDeleteSelf] = useState(false);

  const handleAcceptFriendRequest = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/user/${senderId}/add-friend/${session}/${notificationId}`);
    setDeleteSelf(true);
  };

  const handleDeclineFriendRequest = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/user/${senderId}/decline-request/${session}/${notificationId}`);
    setDeleteSelf(true);
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/user/${props.notification.senderId}`).then((res) => {
      setSenderPicture(res.data.profilePicture);
      setSenderUsername(res.data.username);
      setSenderId(res.data.id);
      setNotificationId(props.notification.id);
      setIsLoading(false);
    });
  }, [props.notification.id, props.notification.senderId]);

  let content;
  if (deleteSelf) {
    content = <br />;
  } else if (!isLoading) {
    switch (props.notification.notificationType) {
      case "FRIENDREQUEST":
        content = (
          <div className="notification">
            <div className="profilePicture">
              <img src={senderPicure} alt="sender" className="profilePicture" />
            </div>
            <div className="message">
              <p>{senderUsername} want to add you as a friend!</p>
            </div>
            <div className="icon">
              <CheckIcon color="secondary" fontSize="large" onClick={handleAcceptFriendRequest} />
              <CloseIcon color="secondary" fontSize="large" onClick={handleDeclineFriendRequest} />
            </div>
          </div>
        );
        break;

      case "VOTE":
        content = (
          <div className="notification">
            <div>
              <img src={senderPicure} alt="sender" className="profilePicture" />
            </div>
            <Link to={`/question/${props.notification.postId}`}>
              <div>
                <p>{senderUsername} voted on your post!</p>
              </div>
            </Link>
          </div>
        );
        break;

      case "COMMENT":
        content = (
          <div className="notification">
            <div>
              <img src={senderPicure} alt="sender" className="profilePicture" />
            </div>
            <div>
              <Link to={`/question/${props.notification.postId}`}>
                <p>{senderUsername} commented to your post!</p>
              </Link>
            </div>
          </div>
        );
        break;
      default:
        content = <div></div>;
    }
  } else {
    content = <p>Loading...</p>;
  }

  return <NotificationDiv>{content}</NotificationDiv>;
};

export default Notification;
