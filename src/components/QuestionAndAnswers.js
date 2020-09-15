import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AnswerList from "./AnswerList";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import Question from "./Question";

const PostAndComment = styled.div`
  .button {
    margin-left: 20%;
    border-radius: 20px;
    padding: 5px;
    background: #333333;
    width: 100px;
    text-align: center;
  }
  .LinkButton {
    text-decoration: none;
    color: white;
  }
  .button:hover {
    background: #76d14f;
    color: black;
  }
`;
const QuestionAndAnswers = ({ match }) => {
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [answerId, setAnswerId] = useState(null);
  const session = useContext(UserSession)[0];
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/post/${match.params.id}`).then((res) => {
      console.log(match.params.id);
      setQuestion(res.data);
      setAnswerId(res.data.id);
      setIsLoading(false);
    });
  }, [match.params.id, session]);

  if (!isLoading) {
    content = (
      <PostAndComment>
        <Question question={question} />
        <Link to={`/addAnswer/${question.id}`} className="LinkButton">
          <div className="button">Comment</div>
        </Link>
        <hr />
        <AnswerList answerId={answerId} />
      </PostAndComment>
    );
  } else content = "Loading...";

  return content;
};

export default QuestionAndAnswers;
