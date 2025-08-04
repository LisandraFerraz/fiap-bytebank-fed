import { apiFetch } from "../../core/core-api";
import { endpoints } from "../../core/environment/endpoints";
import { UserDataStore } from "../../stores/user-data-store";
import { IUserConta } from "../interfaces/conta";
import { Pagination } from "../interfaces/pagination";
import { TransactionFilter } from "../interfaces/transaction";

export const UseAccount = () => {
  const { user, access_token } = UserDataStore((state) => state.data);

  const getAccountDetails = async (
    filters: TransactionFilter,
    pagination?: Partial<Pagination>
  ): Promise<{
    accountDetails: IUserConta;
    transacoes: any;
    successMsg: string;
  }> => {
    return await apiFetch({
      url: `/api/transactions?usuarioCpf=${user?.cpf}&transType=${filters.transType}&transPeriod=${filters.transPeriod}&itemsPage=${pagination?.itemsPage}&currentPage=${pagination?.currentPage}`,
      method: "GET",
      access_token: `${access_token}`,
    });
  };

  return {
    getAccountDetails,
  };
};
