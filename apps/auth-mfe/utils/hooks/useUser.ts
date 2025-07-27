import { LoginBody, NewAccoutnBody, SignupUserBody } from "../classes/login";
import { UserData } from "../interfaces/user";
import { apiFetch } from "@bytebank/utils";

export const UseUser = () => {
  const LOCAL_API_URL = "http://localhost:3000";

  const loginUser = async (loginBody: LoginBody) => {
    return await apiFetch<UserData>({
      url: `/api/login`,
      method: "POST",
      body: loginBody,
    });
  };

  const registerUser = async (signupBody: SignupUserBody) => {
    return await apiFetch({
      url: `${LOCAL_API_URL}/user/register`,
      method: "POST",
      body: signupBody,
    });
  };

  const registerAccount = async (accountBody: NewAccoutnBody) => {
    return await apiFetch({
      url: `${LOCAL_API_URL}/account/register`,
      method: "POST",
      body: accountBody,
    });
  };

  return { loginUser, registerUser, registerAccount };
};
