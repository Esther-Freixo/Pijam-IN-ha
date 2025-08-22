import { useEffect, useState } from "react";
import type { Feedback } from "../Types/Feedback";
import axios from "axios";

export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const url = "http://localhost:3001/feedbacks";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setFeedbacks(response.data);
      })
      .catch((error) => console.error("Algo deu errado: " + error));
  }, []);
  return { feedbacks };
}
