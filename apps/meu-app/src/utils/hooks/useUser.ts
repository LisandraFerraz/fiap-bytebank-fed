import { endpoints } from "../../environment/endpoints";

export const UseUser = () => {
  const getUserInfo = (cpf: string) => {
    return fetch(`${endpoints.listaUser}?cpf=${cpf}`, {
      method: "GET",
    });
  };

  const getAccountInfo = (cpf: string) => {
    return fetch(`${endpoints.listaAccount}?cpf=${cpf}`);
  };

  return { getUserInfo, getAccountInfo };
};
