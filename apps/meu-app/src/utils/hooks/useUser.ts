import { endpoints } from "../../core/environment/endpoints";
import { apiFetch } from "../../core/core-api";

export const UseUser = () => {
  const loginUser = async (loginBody: { email: string; password: string }) => {
    return await apiFetch({
      url: `${endpoints.login}`,
      method: "POST",
      body: loginBody,
    });
  };

  return { loginUser };
};
