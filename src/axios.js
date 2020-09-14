import { useState, useEffect } from "react";
import axios from "axios";

export const useGet = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url).then((res) => {
      return res.json();
    });
  }, [url]);

  return [isLoading, data];
};
