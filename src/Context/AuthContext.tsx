import { createContext } from "react";
import type { IValue } from "./userType";
;

export const AuthContext = createContext<IValue>({
  user: null,
  loading: true,

  refetchUser: async () => {
    throw new Error("refetchUser not initialized");
  }
});