import { useUserContext } from "../../context/user-context";
import { endpoints } from "../../environment/endpoints";
import { ITed } from "../interfaces/transaction";

export const useTed = () => {
  const { user } = useUserContext();

  const sendTed = async (body: ITed) => {
    return await fetch(`${endpoints.ted}?usuarioCpf=${user?.cpf}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteTed = async (id: string) => {
    return await fetch(`${endpoints.ted}?usuarioCpf=${user?.cpf}&id=${id}`, {
      method: "DELETE",
    });
  };

  const updateTed = async (body: ITed) => {
    return await fetch(`${endpoints.ted}?usuarioCpf=${user?.cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return { sendTed, deleteTed, updateTed };
};
