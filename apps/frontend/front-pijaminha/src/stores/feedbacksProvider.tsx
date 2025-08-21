import type { ReactNode } from "react";
import { useFeedbacks } from "../hooks/useFeedbacks";
import { FeedbacksContext } from "./feedbacksContext";

export function FeedbacksProvider({ children }: { children: ReactNode }) {
  const { feedbacks } = useFeedbacks();
  return (
    <FeedbacksContext.Provider value={{ feedbacks }}>
      {children}
    </FeedbacksContext.Provider>
  );
}
