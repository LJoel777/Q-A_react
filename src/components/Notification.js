import React, { useState } from "react";
import styled from "styled-components";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Dropdown} from 'react-bootstrap'



const Notification = () => {
    return (
        <Dropdown>
        <Dropdown.Toggle id="dropdownBtn">
        <NotificationsIcon color = "secondary" fontSize="large" />       
         </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };


export default Notification;
