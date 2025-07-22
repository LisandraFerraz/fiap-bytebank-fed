import { env } from "../../core/environment/api-urls";
import { apiFetch } from "../../core/core-api";
import { UserDataStore } from "../../stores/user-data-store";

export const UseAccount = () => {
  const { user, access_token } = UserDataStore((state) => state.data);

  const getAccountByCpf = async () => {
    return await apiFetch({
      url: `${env.NEST_API}/account/one/${user?.cpf}`,
      method: "GET",
      access_token: `${access_token}`,
    });
  };

  const getAccountDetails = async () => {
    return await apiFetch({
      url: `/api/transactions?usuarioCpf=${user?.cpf}`,
      method: "GET",
      access_token: `${access_token}`,
    });
  };

  return {
    getAccountByCpf,
    getAccountDetails,
  };
};
