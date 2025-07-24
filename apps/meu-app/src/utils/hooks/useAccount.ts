import { apiFetch } from "../../core/core-api";
import { endpoints } from "../../core/environment/endpoints";
import { UserDataStore } from "../../stores/user-data-store";
import { IUserConta } from "../interfaces/conta";
import { TransactionFilter } from "../interfaces/transaction";

export const UseAccount = () => {
  const { user, access_token } = UserDataStore((state) => state.data);

  const getAccountDetails = async (
    filters: TransactionFilter
  ): Promise<{
    accountDetails: IUserConta;
    transacoes: any;
    successMsg: string;
  }> => {
    return await apiFetch({
      url: `${endpoints.transacoes}?usuarioCpf=${user?.cpf}&transType=${filters.transType}&transPeriod=${filters.transPeriod}`,
      method: "GET",
      access_token: `${access_token}`,
    });
  };

  return {
    getAccountDetails,
  };
};
