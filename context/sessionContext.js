import { createContext, useContext } from "react";

export const SessionContext = createContext();

export function useSessionContext() {
  return useContext(SessionContext);
}
