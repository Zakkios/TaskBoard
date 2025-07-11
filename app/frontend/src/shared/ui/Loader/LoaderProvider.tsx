import { useState, ReactNode } from "react";
import { LoaderContext } from "./useLoader";
import Loader from "./Loader";

type LoaderProviderProps = {
  children: ReactNode;
};

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  return (
    <LoaderContext.Provider value={{ show, hide, isVisible }}>
      {children}
      {isVisible && <Loader />}
    </LoaderContext.Provider>
  );
}
