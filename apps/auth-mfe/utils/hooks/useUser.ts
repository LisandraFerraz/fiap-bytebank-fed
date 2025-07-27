import { UserData } from "../interfaces/user";
import { apiFetch } from "@bytebank/utils";

export const UseUser = () => {
  const loginUser = async (loginBody: { email: string; password: string }) => {
    return await apiFetch<UserData>({
      url: `/api/user/login`,
      method: "POST",
      body: loginBody,
    });
  };

  return { loginUser };
};
