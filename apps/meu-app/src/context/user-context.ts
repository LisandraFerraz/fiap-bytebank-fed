import { createContext, useContext } from "react";
import { IUsuario } from "../utils/interfaces/user";
import { IConta } from "../utils/interfaces/conta";

interface IUserContext {
  user: IUsuario | null;
  account: IConta | null;
  access_token: string | null;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  account: null,
  access_token: null,
});

export const useUserContext = () => useContext(UserContext);
