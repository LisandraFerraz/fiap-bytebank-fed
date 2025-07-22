import { useUserContext } from "../../context/user-context";
import { env } from "../../core/environment/api-urls";
import { apiFetch } from "../../core/core-api";
import { ITed } from "../interfaces/transaction";

export const useTed = () => {
  const { account, access_token } = useUserContext();

  const sendTed = async (body: ITed) => {
    return await apiFetch({
      method: "PUT",
      url: `${env.NEST_API}/account/${account?._id}/transaction/new`,
      body: body,
      access_token: `${access_token}`,
    });
  };

  const deleteTed = async (id: string) => {
    return await apiFetch({
      url: `${env.NEST_API}/account/${account?._id}/transaction/delete?transId=${id}`,
      method: "PATCH",
      access_token: `${access_token}`,
    });
  };

  const updateTed = async (body: ITed) => {
    return await apiFetch({
      url: `${env.NEST_API}/account/${account?._id}/transaction`,
      method: "PATCH",
      body: body,
      access_token: `${access_token}`,
    });
  };

  return { sendTed, deleteTed, updateTed };
};
