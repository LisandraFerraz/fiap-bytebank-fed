import { apiFetch } from "../../core/core-api";
import { IPix } from "../interfaces/transaction";
import { UserDataStore } from "../../stores/user-data-store";

export const UsePix = () => {
  const { account, access_token } = UserDataStore((state) => state.data);

  const sendPix = async (body: IPix) => {
    return await apiFetch({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_API_URL}/account/${account?._id}/transaction/new`,
      body: body,
      access_token: `${access_token}`,
    });
  };

  const deletePix = async (id: string) => {
    return await apiFetch({
      url: `${process.env.NEXT_PUBLIC_API_URL}/account/${account?._id}/transaction/delete?transId=${id}`,
      method: "PATCH",
      access_token: `${access_token}`,
    });
  };

  const updatePix = async (body: IPix) => {
    return await apiFetch({
      url: `${process.env.NEXT_PUBLIC_API_URL}/account/${account?._id}/transaction`,
      method: "PATCH",
      body: body,
      access_token: `${access_token}`,
    });
  };

  return {
    sendPix,
    deletePix,
    updatePix,
  };
};
