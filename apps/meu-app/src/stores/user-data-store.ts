import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IUsuario } from "../utils/interfaces/user";
import { IUserConta } from "../utils/interfaces/conta";

interface UserData {
  access_token: string;
  user: IUsuario | null;
  account: IUserConta | null;
}

type UserDataStore = {
  data: UserData;
  setUserData: (data: UserData) => void;
};

export const UserDataStore = create<UserDataStore>()(
  persist(
    (set, get) => ({
      data: {
        access_token: "",
        user: null,
        account: null,
      },
      setUserData: (data: UserData) => set(() => ({ data })),
    }),
    {
      name: "user_data_store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
