import { apiFetch } from "../../core/core-api";
import { ITed } from "../interfaces/transaction";
import { UserDataStore } from "../../stores/user-data-store";

export const useTed = () => {
  const { account, access_token } = UserDataStore((state) => state.data);

  const sendTed = async (body: ITed) => {
    return await apiFetch({
      method: "PUT",
      url: `${process.env.BYTEBANK_API_URL}/account/${account?._id}/transaction/new`,
      body: body,
      access_token: `${access_token}`,
    });
  };

  const deleteTed = async (id: string) => {
    return await apiFetch({
      url: `${process.env.BYTEBANK_API_URL}/account/${account?._id}/transaction/delete?transId=${id}`,
      method: "PATCH",
      access_token: `${access_token}`,
    });
  };

  const updateTed = async (body: ITed) => {
    return await apiFetch({
      url: `${process.env.BYTEBANK_API_URL}/account/${account?._id}/transaction`,
      method: "PATCH",
      body: body,
      access_token: `${access_token}`,
    });
  };

  return { sendTed, deleteTed, updateTed };
};
