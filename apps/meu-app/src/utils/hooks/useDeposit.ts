import { useUserContext } from "../../context/user-context";
import { endpoints } from "../../environment/endpoints";
import { IDeposito } from "../interfaces/transaction";

export const UseDeposit = () => {
  const { user } = useUserContext();

  // Adiciona dinheiro na propria conta
  const createDeposit = async (body: IDeposito) => {
    return fetch(`${endpoints.deposit}?usuarioCpf=${user?.cpf}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const updateDeposit = async (body: IDeposito) => {
    return await fetch(`${endpoints.deposit}?usuarioCpf=${user?.cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteDeposit = async (id: string) => {
    return await fetch(
      `${endpoints.deposit}?id=${id}&usuarioCpf=${user?.cpf}`,
      {
        method: "DELETE",
      }
    );
  };

  return {
    createDeposit,
    deleteDeposit,
    updateDeposit,
  };
};
