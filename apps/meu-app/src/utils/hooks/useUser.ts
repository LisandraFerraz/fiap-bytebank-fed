import { endpoints } from "../../app/api/_environment/endpoints";

export const UseUser = () => {
  const getUserInfo = async (cpf: string) => {
    const resBff = await fetch(`${endpoints.listaUsuarios}?cpf=${cpf}`);

    const data = await resBff.json();
    return data;
  };

  return { getUserInfo };
};
