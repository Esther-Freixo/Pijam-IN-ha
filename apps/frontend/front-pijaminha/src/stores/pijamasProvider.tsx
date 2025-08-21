import type { ReactNode } from "react";
import { usePijamas } from "../hooks/usePijamas";
import { PijamasContext } from "./pijamasContext";

export function PijamasProvider({ children }: { children: ReactNode }) {
  const { pijamas } = usePijamas();
  return (
    <PijamasContext.Provider value={{ pijamas }}>
      {children}
    </PijamasContext.Provider>
  );
}
