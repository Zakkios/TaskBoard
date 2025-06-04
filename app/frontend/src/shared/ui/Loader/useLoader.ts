import { createContext, useContext } from "react";

export const LoaderContext = createContext({
  show: () => {},
  hide: () => {},
  isVisible: false,
});

export function useLoader() {
  return useContext(LoaderContext);
}
