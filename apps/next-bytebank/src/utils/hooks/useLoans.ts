import { endpoints } from "../../core/environment/endpoints";
import { env } from "../../core/environment/api-urls";
import { apiFetch } from "../../core/core-api";
import { UserDataStore } from "../../stores/user-data-store";
import { IEmprestimo } from "../interfaces/transaction";
import { Pagination } from "../interfaces/pagination";

export function UseLoans() {
  const { account, access_token } = UserDataStore((state) => state.data);

  const requestLoan = async (body: IEmprestimo) => {
    return await apiFetch({
      url: `${env.NEST_API}/account/${account?._id}/loan/new`,
      method: "POST",
      body: JSON.stringify(body),
      access_token: `${access_token}`,
    });
  };

  const payLoan = async (body: IEmprestimo) => {
    return await apiFetch({
      url: `${env.NEST_API}/account/${account?._id}/loan`,
      method: "PATCH",
      body: JSON.stringify(body),
      access_token: `${access_token}`,
    });
  };

  const deleteLoan = async (id: string) => {
    return await apiFetch({
      method: "DELETE",
      url: `${env.NEST_API}/account/${account?._id}/loan/delete?loanId=${id}`,
      access_token: `${access_token}`,
    });
  };

  const updateLoan = async (body: IEmprestimo) => {
    return await apiFetch({
      url: `${env.NEST_API}/account/${account?._id}/loan/edit`,
      method: "PATCH",
      access_token: `${access_token}`,
      body: body,
    });
  };

  const getOrderedLoan = async (usuarioCpf: string) => {
    const data: { loanPending: []; paidLoan: [] } = await apiFetch({
      url: `${endpoints.loan}?usuarioCpf=${usuarioCpf}`,
      method: "GET",
      access_token: `${access_token}`,
    });

    const { loanPending, paidLoan } = data;

    return {
      loanPending,
      paidLoan,
    };
  };

  return {
    payLoan,
    deleteLoan,
    updateLoan,
    requestLoan,
    getOrderedLoan,
  };
}
