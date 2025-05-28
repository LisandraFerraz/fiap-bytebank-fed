import { useUserContext } from "../../context/user-context";
import { endpoints } from "../../environment/endpoints";
import { IDeposito, IEmprestimo, IPix, ITed } from "../interfaces/transaction";

export const UseTransactions = () => {
  const { user } = useUserContext();

  // Envia dinheiro
  const sendBankDeposit = (body: ITed) => {
    return fetch(`${endpoints.sendMoney}?usuarioCpf=${user?.cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const sendPix = (body: IPix) => {
    return fetch(`${endpoints.sendPix}?usuarioCpf=${user?.cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // Pede empréstimo
  const requestLoan = async (body: IEmprestimo) => {
    return await fetch(`${endpoints.requestLoan}?cpf=${user?.cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return {
    sendPix,
    sendBankDeposit,
    requestLoan,
  };
};
