import { apiFetch } from "../../core/core-api";
import { IDeposito } from "../interfaces/transaction";
import { UserDataStore } from "../../stores/user-data-store";

export const UseDeposit = () => {
  const { account, access_token } = UserDataStore((state) => state.data);

  // Adiciona dinheiro na propria conta
  const createDeposit = async (body: IDeposito) => {
    return apiFetch({
      url: `${process.env.BYTEBANK_API_URL}/account/${account?._id}/deposit/new`,
      access_token: `${access_token}`,
      method: "PUT",
      body: body,
    });
  };

  const updateDeposit = async (body: IDeposito) => {
    return apiFetch({
      url: `${process.env.BYTEBANK_API_URL}/account/${account?._id}/deposit`,
      method: "PATCH",
      access_token: `${access_token}`,
      body: body,
    });
  };

  const deleteDeposit = async (id: string) => {
    return apiFetch({
      url: `${process.env.BYTEBANK_API_URL}/account/${account?._id}/deposit/delete?depositId=${id}`,
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
