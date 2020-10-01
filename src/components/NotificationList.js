import React, { useState, useContext, useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import Notification from "./Notification";
import { Tooltip } from "@material-ui/core";

const NotificationList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0][0];
  const [allNotifications, setAllNotification] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/notification/get-all/${session}`).then((res) => {
      setAllNotification(res.data);
      setIsLoading(false);
    });
  }, [session]);

  let content;
  if (!isLoading) {
    content = (
      <Dropdown>
        <Dropdown.Toggle id="dropdownBtn">
          <Tooltip title="Notifications">
            <NotificationsIcon color="secondary" fontSize="large" />
          </Tooltip>
        </Dropdown.Toggle>
        <Dropdown.Menu className="notification">
          {allNotifications.length > 0 ? (
            allNotifications.map((notification, index) => {
              return <Notification key={index} notification={notification} />;
            })
          ) : (
            <div>There is no new notification</div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    content = <p>...loading</p>;
  }
  return content;
};

export default NotificationList;
