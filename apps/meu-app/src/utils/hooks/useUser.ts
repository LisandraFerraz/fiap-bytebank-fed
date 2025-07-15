import { endpoints } from "../../environment/endpoints";

export const UseUser = () => {
  const getUserInfo = async (loginBody: {
    email: string;
    password: string;
  }) => {
    return await fetch(`${endpoints.listaUser}`, {
      method: "POST",
      body: JSON.stringify(loginBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getAccountInfo = async (cpf: string) => {
    return await fetch(`${endpoints.listaAccount}?cpf=${cpf}`);
  };

  return { getUserInfo, getAccountInfo };
};
