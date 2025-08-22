import { createContext } from "react";
import type { Pijama } from "../Types/Pijama";

export interface PijamasContextData {
  pijamas: Pijama[];
}

export const PijamasContext = createContext<PijamasContextData | null>(null);