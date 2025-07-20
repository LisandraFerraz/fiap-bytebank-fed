import { useUserContext } from "../../context/user-context";
import { endpoints } from "../../core/environment/endpoints";
import { env } from "../../pages/api/_environment/environment";
import { IEmprestimo } from "../interfaces/transaction";

export function UseLoans() {
  const { account, access_token } = useUserContext();

  const requestLoan = async (body: IEmprestimo) => {
    return await fetch(`${env.NEST_API}/account/${account?._id}/loan/new`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  const payLoan = async (body: IEmprestimo) => {
    return await fetch(`${env.NEST_API}/account/${account?._id}/loan`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  const deleteLoan = async (id: string) => {
    return await fetch(
      `${env.NEST_API}/account/${account?._id}/loan/delete?loanId=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  };

  const updateLoan = async (body: IEmprestimo) => {
    const response = await fetch(
      `${env.NEST_API}/account/${account?._id}/loan/edit`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  };

  const getOrderedLoan = async (usuarioCpf: string) => {
    const response = await fetch(`${endpoints.loan}?usuarioCpf=${usuarioCpf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();
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
