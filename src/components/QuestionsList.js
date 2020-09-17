import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import PostModal from "./PostModal";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';

const Container = styled.div`
  display:flex;
  flex:1;
  min-width:fit-content;
  flex-direction:row;
`;

const QuestionsList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0][0];

  let content = "";

  useEffect(() => {
    setIsLoading(true);
    let url;
    if (props.match.path === "/" || props.match.path === "/hobby-news") {
      url = "http://localhost:8080/hobby-news/" + session;
    } else {
      url = "http://localhost:8080/friend-news/" + session;
    }
    if (!isNaN(session)) {
      axios.get(url).then((res) => {
        console.log(res.data);
        setQuestions(res.data);
        setIsLoading(false);
      });
    } else{ console.log("Most");
  }}, [session, props.match.path]);

  if (!isLoading && !isNaN(session)) {

      content = (
        <Container className="col">           

                 <div className="profileSide">
                   <ul>
                     <li><HomeIcon color="secondary" fontSize="large" /><p>Home</p></li>
                     <li><PersonIcon color="secondary" fontSize="large"/><p>Profile</p></li>
                     <li><SettingsIcon color="secondary" fontSize="large"/><p>Settings</p></li>
                     <li><PowerSettingsNewIcon color="secondary" fontSize="large"/><p>Logout</p></li>
                   </ul>
                </div>    
                <div className="feed">
                <PostModal className="postModal" isLoading={isLoading} session={session} history={props.history} />      
                {questions.map((question) => (            
                   <Question key={question.id} question={question} />           
                   ))}
                   </div>       
                <div className="chatSide">
                <ul>
                     {/* <li>casdas</li>
                     <li>dasdas</li>
                     <li>fefefefe</li>
                     <li>fafafaafa</li>
                     <li>fefefefe</li> */}
                   </ul>
                  </div>    
                  </Container> 
      )
    
  } else if (isNaN(session)) {
    props.history.push("/login");
  } else content = "Loading";
  return content;
};

export default QuestionsList;
