import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import PostModal from "./PostModal";

const Container = styled.div`
  display:flex;
  flex:1;
  min-width:fit-content;
  flex-direction:row;
`;

const QuestionsList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useContext(UserSession)[0];

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
                     <li>casdas</li>
                     <li>dasdas</li>
                     <li>fefefefe</li>
                     <li>fafafaafa</li>
                     <li>fefefefe</li>
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
                     <li>casdas</li>
                     <li>dasdas</li>
                     <li>fefefefe</li>
                     <li>fafafaafa</li>
                     <li>fefefefe</li>
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
