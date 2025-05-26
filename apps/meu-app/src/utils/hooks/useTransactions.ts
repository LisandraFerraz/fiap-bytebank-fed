import { endpoints } from "../../environment/endpoints";
import { IDeposito, IEmprestimo, IPix, ITed } from "../interfaces/transaction";

export const UseTransactions = () => {
  // Envia dinheiro
  const sendBankDeposit = (cpf: string, body: ITed) => {
    return fetch(`${endpoints.sendMoney}?usuarioCpf=${cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const sendPix = (cpf: string, body: IPix) => {
    return fetch(`${endpoints.sendPix}?usuarioCpf=${cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // Adiciona dinheiro na propria conta
  const addMoney = async (cpf: string, body: IDeposito) => {
    return fetch(`${endpoints.addMoney}?usuarioCpf=${cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // Pede empréstimo
  const requestLoan = async (cpf: string, body: IEmprestimo) => {
    return await fetch(`${endpoints.requestLoan}?cpf=${cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // REVISAR!
  // loanId está como query param e também no body. usar somente a do body!
  const payLoan = async (cpf: string, body: IEmprestimo) => {
    await fetch(`${endpoints.payLoan}?cpf=${cpf}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // TODO: Calcula câmbio
  // const currencyExc = async () => {};

  return { sendPix, sendBankDeposit, addMoney, requestLoan, payLoan };
};
