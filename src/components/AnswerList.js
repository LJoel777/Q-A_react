import React, { useEffect, useState } from "react";
import axios from "axios";
import Answer from "./Answer";
import AddComment from "./AddComment";

const AnswerList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/answer/answersByQuestionId/${props.questionId}`).then((res) => {
      setAnswers(res.data);
      setIsLoading(false);
      setRefresh(false);
    });
  }, [props.questionId, refresh]);

  if (!isLoading) {
    content = (
      <div>
        <AddComment id={props.questionId} setRefresh={setRefresh.bind(this)} />
        {answers.map((answer) => (
          <Answer key={answer.id} answer={answer} setRefresh={setRefresh.bind(this)} />
        ))}
      </div>
    );
  } else content = "Loading...";

  return content;
};

export default AnswerList;
