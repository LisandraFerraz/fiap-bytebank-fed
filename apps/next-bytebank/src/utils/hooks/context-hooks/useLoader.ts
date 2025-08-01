import { useContext } from "react";
import { LoaderContext } from "../../contexts/loading-context";

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("Deve ser retornado em um context.");
  }
  return context;
};
