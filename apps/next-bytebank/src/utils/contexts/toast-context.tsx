import Toast from "@components/toaster/toast";
import { createContext, ReactNode, useState } from "react";
import { toastTypes } from "../types";

type ToastContext = {
  showToast: (type: toastTypes, message: string) => void;
  hideTost: () => void;
};

type ToastProvider = {
  children: ReactNode;
};

export const ToastContext = createContext<ToastContext | undefined>(undefined);

export const ToastProvider = ({ children }: ToastProvider) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<toastTypes>("success");

  const contextValue: ToastContext = {
    showToast: (type, message: string) => {
      setIsVisible(true);
      setToastMsg(message);
      setToastType(type);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    },
    hideTost: () => {
      setIsVisible(false);
    },
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <>
        {isVisible && <Toast type={toastType} message={toastMsg} />}
        {children}
      </>
    </ToastContext.Provider>
  );
};
