import { useUserContext } from "../../context/user-context";
import { endpoints } from "../../environment/endpoints";
import { env } from "../../pages/api/_environment/environment";
import { IDeposito } from "../interfaces/transaction";

export const UseDeposit = () => {
  const { account } = useUserContext();

  // Adiciona dinheiro na propria conta
  const createDeposit = async (body: IDeposito) => {
    return fetch(`${env.NEST_API}/account/${account?._id}/deposit/new`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const updateDeposit = async (body: IDeposito) => {
    return fetch(`${env.NEST_API}/account/${account?._id}/deposit`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteDeposit = async (id: string) => {
    return fetch(
      `${env.NEST_API}/account/${account?._id}/deposit/delete?depositId=${id}`,
      {
        method: "PATCH",
      }
    );
  };

  return {
    createDeposit,
    deleteDeposit,
    updateDeposit,
  };
};
