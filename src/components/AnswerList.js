import React, { useEffect, useState } from "react";
import axios from "axios";
import Answer from "./Answer";

const AnswerList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/answer/answersByQuestionId/${props.questionId}`).then((res) => {
      setAnswers(res.data);
      setIsLoading(false);
    });
  }, [props]);

  if (!isLoading) {
    content = (
      <div>
        {answers.map((answer) => (
          <Answer key={answer.id} answer={answer} />
        ))}
      </div>
    );
  } else content = "Loading...";

  return content;
};

export default AnswerList;
