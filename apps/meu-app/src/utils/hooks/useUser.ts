import { endpoints } from "../../core/environment/endpoints";

export const UseUser = () => {
  const getUserInfo = async (loginBody: {
    email: string;
    password: string;
  }) => {
    const response = await fetch(`${endpoints.login}`, {
      method: "POST",
      body: JSON.stringify(loginBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { access_token } = await response.json();
    localStorage.setItem("access_token", access_token);

    return response;
  };

  const getAccountInfo = async (cpf: string) => {
    return await fetch(`${endpoints.listaAccount}?cpf=${cpf}`);
  };

  return { getUserInfo, getAccountInfo };
};
