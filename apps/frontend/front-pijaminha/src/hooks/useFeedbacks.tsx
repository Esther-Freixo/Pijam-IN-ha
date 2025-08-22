import { useEffect, useState } from "react";
import type { Feedback } from "../Types/Feedback";
import axios from "axios";

interface FectchFeedbacks {
  feedbacks: Feedback[];
}

export function useFeedbacks() {

  const [feedbacks, setFeedbacks] = useState<FectchFeedbacks>();
  const url = "http://localhost:3333/feedbacks";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setFeedbacks(response.data);
        console.log("hook", feedbacks);
      })
      .catch((error) => console.error("Algo deu errado: " + error));
  }, []);
  return { feedbacks };
}
