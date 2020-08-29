import React, { useState, useEffect } from "react";
import Question from "./Question";
import axios from "axios";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:8080/questions").then((res) => {
      setQuestions(res.data);
      setIsLoading(false);
    });
  }, []);

  if (!isLoading) {
    content = (
      <div>
        <div className="col">
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      </div>
    );
  } else content = "Loading";

  return content;
};

export default QuestionsList;
