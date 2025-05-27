import { createContext, useContext } from "react";
import { IUsuario } from "../utils/interfaces/user";

interface IUserContext {
  user: IUsuario | null;
}

export const UserContext = createContext<IUserContext>({ user: null });

export const useUserContext = () => useContext(UserContext);
