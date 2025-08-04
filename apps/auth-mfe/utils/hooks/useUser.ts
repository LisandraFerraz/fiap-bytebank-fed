import { LoginBody, NewAccountBody, SignupUserBody } from "../classes/login";
import { UserData } from "../interfaces/user";
import { apiFetch } from "@bytebank/utils";

export const UseUser = () => {
  const loginUser = async (loginBody: LoginBody) => {
    return await apiFetch<UserData>({
      url: `/api/login`,
      method: "POST",
      body: loginBody,
    });
  };

  const registerUser = async (signupBody: SignupUserBody) => {
    return await apiFetch({
      url: `/nest/user/register`,
      method: "POST",
      body: signupBody,
    });
  };

  const registerAccount = async (accountBody: NewAccountBody) => {
    return await apiFetch({
      url: `/nest/account/register`,
      method: "POST",
      body: accountBody,
    });
  };

  return { loginUser, registerUser, registerAccount };
};
