import { useContext } from "react";
import {
  PijamasContext,
  type PijamasContextData,
} from "../stores/pijamasContext";

export function usePijamasContext(): PijamasContextData {
  const context = useContext(PijamasContext);
  if (context === null) {
    throw new Error("erro");
  }
  return context;
}
