import Loader from "@components/loader/loader";
import { createContext, ReactNode, useState } from "react";

type LoaderContext = {
  showLoader: () => void;
  hideLoader: () => void;
};

type LoaderContextProvider = {
  children: ReactNode;
};

export const LoaderContext = createContext<LoaderContext | undefined>(
  undefined
);

export const LoaderProvider = ({ children }: LoaderContextProvider) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const contextValue: LoaderContext = {
    showLoader: () => {
      setIsVisible(true);
    },
    hideLoader: () => {
      setIsVisible(false);
    },
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      {isVisible && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};
