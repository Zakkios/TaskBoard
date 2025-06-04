import { useState, ReactNode } from "react";
import Loader from "@/shared/ui/Loader/Loader";
import { LoaderContext } from "@/shared/ui/Loader/useLoader";

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
