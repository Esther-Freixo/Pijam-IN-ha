import { createContext } from "react";
import type { Feedback } from "../Types/Feedback";

export interface FeedbacksContextData {
  feedbacks: Feedback[];
}

export const FeedbacksContext = createContext<FeedbacksContextData | null>(
  null
);
