import { useContext } from "react";
import {
  FeedbacksContext,
  type FeedbacksContextData,
} from "../stores/feedbacksContext";

export function useFeedbacksContext(): FeedbacksContextData {
  const context = useContext(FeedbacksContext);
  if (context === null) {
    throw new Error("erro");
  }
  return context;
}
