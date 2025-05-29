import { endpoints } from "../../environment/endpoints";

export const UseUser = () => {
  const getUserInfo = async (cpf: string) => {
    return await fetch(`${endpoints.listaUser}?cpf=${cpf}`, {
      method: "GET",
    });
  };

  const getAccountInfo = async (cpf: string) => {
    return await fetch(`${endpoints.listaAccount}?cpf=${cpf}`);
  };

  return { getUserInfo, getAccountInfo };
};
