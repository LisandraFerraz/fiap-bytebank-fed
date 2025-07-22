import { useUserContext } from "../../context/user-context";
import { endpoints } from "../../core/environment/endpoints";
import { env } from "../../core/environment/api-urls";
import { apiFetch } from "../../core/core-api";
import { IDeposito } from "../interfaces/transaction";

export const UseDeposit = () => {
  const { account, access_token } = useUserContext();

  // Adiciona dinheiro na propria conta
  const createDeposit = async (body: IDeposito) => {
    return apiFetch({
      url: `${env.NEST_API}/account/${account?._id}/deposit/new`,
      access_token: `${access_token}`,
      method: "PUT",
      body: body,
    });
  };

  const updateDeposit = async (body: IDeposito) => {
    return apiFetch({
      url: `${env.NEST_API}/account/${account?._id}/deposit`,
      method: "PATCH",
      access_token: `${access_token}`,
      body: body,
    });
  };

  const deleteDeposit = async (id: string) => {
    return apiFetch({
      url: `${env.NEST_API}/account/${account?._id}/deposit/delete?depositId=${id}`,
      method: "PATCH",
      access_token: `${access_token}`,
    });
  };

  return {
    createDeposit,
    deleteDeposit,
    updateDeposit,
  };
};
