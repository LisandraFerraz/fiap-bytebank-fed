import { useUserContext } from "../../context/user-context";
import { endpoints } from "../../environment/endpoints";
import { IPix } from "../interfaces/transaction";

export const UsePix = () => {
  const { user } = useUserContext();

  const sendPix = (body: IPix) => {
    return fetch(`${endpoints.sendPix}?accountId=${user?._id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deletePix = (id: string) => {
    return fetch(`${endpoints.sendPix}?usuarioCpf=${user?.cpf}&id=${id}`, {
      method: "DELETE",
    });
  };

  const updatePix = (body: IPix) => {
    return fetch(`${endpoints.sendPix}?usuarioCpf=${user?.cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return {
    sendPix,
    deletePix,
    updatePix,
  };
};
