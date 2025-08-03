import { endpoints } from "../../core/environment/endpoints";
import { apiFetch } from "../../core/core-api";
import { UserDataStore } from "../../stores/user-data-store";
import { IEmprestimo } from "../interfaces/transaction";

export function UseLoans() {
  const { account, access_token } = UserDataStore((state) => state.data);

  const requestLoan = async (body: IEmprestimo) => {
    return await apiFetch({
      url: `${process.env.NEXT_PUBLIC_API_URL}/account/${account?._id}/loan/new`,
      method: "PUT",
      body: body,
      access_token: `${access_token}`,
    });
  };

  const payLoan = async (body: IEmprestimo) => {
    return await apiFetch({
      url: `${process.env.NEXT_PUBLIC_API_URL}/account/${account?._id}/loan`,
      method: "PATCH",
      body: body,
      access_token: `${access_token}`,
    });
  };

  const deleteLoan = async (id: string) => {
    return await apiFetch({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_API_URL}/account/${account?._id}/loan/delete?loanId=${id}`,
      access_token: `${access_token}`,
    });
  };

  const updateLoan = async (body: IEmprestimo) => {
    return await apiFetch({
      url: `${process.env.NEXT_PUBLIC_API_URL}/account/${account?._id}/loan/edit`,
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
