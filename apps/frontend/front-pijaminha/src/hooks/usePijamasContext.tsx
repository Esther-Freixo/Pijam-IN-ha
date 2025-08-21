import { useContext } from "react";
import { PijamasContext, type PijamasContextData } from "../stores/context";

export function usePijamasContext(): PijamasContextData {
  const context = useContext(PijamasContext);
  if (context === null) {
    throw new Error("erro");
  }
  return context;
}
