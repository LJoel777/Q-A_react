import React, { useState,useContext,useEffect } from "react";
import styled from "styled-components";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Dropdown} from 'react-bootstrap';
import axios from "axios";
import { UserSession } from "../context/UserSession";
import Notification from "./Notification";


const NotificationList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0][0];
  const [render,setRender] = useState(false);
  const [allNotifications,setAllNotification] = useState([]); 
  useEffect(() => {
    console.log("asd");
    setIsLoading(true);
    axios.get(`http://localhost:8080/notification/get-all/${session}`).then((res) =>{
        setAllNotification(res.data);
        console.log("axios");
        setIsLoading(false);
    });
  },[session]);

  let content;
  if (!isLoading){
    console.log("loading")
    content= (
        <Dropdown >
        <Dropdown.Toggle id="dropdownBtn">
        <NotificationsIcon color = "secondary" fontSize="large" />       
         </Dropdown.Toggle>
        <Dropdown.Menu className="notification">
        {allNotifications.map((notification) => (
          //  <Dropdown.Item> <Notification notification={notification}/></Dropdown.Item>
          console.log(notification)
          ))}
          {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
  else{
    content = <p>...loading</p>
  }
    return content;}


export default NotificationList;
