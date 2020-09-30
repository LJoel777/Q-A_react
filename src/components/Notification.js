import axios from "axios";
import React, { useState,useContext,useEffect } from "react";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const Notification = (props) =>{
    const [senderPicure,setSenderPicture] = useState("")
    const [senderUsername,setSenderUsername] = useState("")


    console.log(props);
    // let content;
    // switch(props.notification.notificationType){
    //     case "FRIENDREQUEST":
    //         axios.get(`http://localhost:8080/user/${props.notification.senderId}`).then((res) =>{
    //             setSenderPicture(res.data);
    //             setSenderUsername(res.data.username)
    //         });
    //         content=(
    //             <div className="notification">
    //                 <div>
    //                     <img src={senderPicure} alt="sender"/>
    //                 </div>
    //                 <div>
    //                     <p>
    //                     {senderUsername} want to add you as a friend!
    //                     </p>
    //                 </div>
    //                 <div>
    //                     <CheckIcon color="secondary" fontSize="large"/>
    //                     <CloseIcon color="secondary" fontSize="large"/>
    //                 </div>
    //             </div>
    //         )
    //         break;

    //     case "VOTE":
    //         content=<p>loading</p>
    //         break;
        
    //     case "COMMENT":
    //        content= <p>loading</p>
    //         break;
    // }
    // return content;
}

export default Notification;