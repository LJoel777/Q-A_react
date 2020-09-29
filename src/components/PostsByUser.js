import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";

function PostsByUser(props) {
  const id = props.id;
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/post/posts-by-user-id/${id}`)
      .then((res) => {
        setQuestions(res.data);
        setIsLoading(false);
      });
  }, [id]);

  if (!isLoading) {
    content = (
      <div>
        {questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </div>
    );
  } else content = "Loading...";

  return content;
}

export default PostsByUser;
