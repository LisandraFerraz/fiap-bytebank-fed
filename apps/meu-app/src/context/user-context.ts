import { createContext, useContext } from "react";
import { IUsuario } from "../utils/interfaces/user";
import { IConta } from "../utils/interfaces/conta";

interface IUserContext {
  user: IUsuario | null;
  account: IConta | null;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  account: null,
});

export const useUserContext = () => useContext(UserContext);
