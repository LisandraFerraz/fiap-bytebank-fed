import { useUserContext } from "../../context/user-context";
import { endpoints } from "../../environment/endpoints";
import { IEmprestimo } from "../interfaces/transaction";

export function UseLoans() {
  const { user } = useUserContext();

  const requestLoan = async (body: IEmprestimo) => {
    return await fetch(`${endpoints.requestLoan}?cpf=${user?.cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const payLoan = async (body: IEmprestimo) => {
    await fetch(`${endpoints.payLoan}?cpf=${user?.cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteLoan = async (id: string) => {
    return await fetch(`${endpoints.loan}?id=${id}&cpf=${user?.cpf}`, {
      method: "DELETE",
    });
  };

  const updateLoan = async (body: IEmprestimo) => {
    return await fetch(`${endpoints.loan}?cpf=${user?.cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return {
    payLoan,
    deleteLoan,
    updateLoan,
    requestLoan,
  };
}
