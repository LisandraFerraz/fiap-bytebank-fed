import { endpoints } from "../../environment/endpoints";
import { IDeposito, IPayLoan, IPix, ITed } from "../interfaces/transaction";

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
  const applyLoan = async (cpf: string, loan: number) => {
    return await fetch(`${endpoints.applyLoan}?cpf=${cpf}&loan=${loan}`, {
      method: "PATCH",
    });
  };

  const payLoan = async (cpf: string, loanId: string, body: IPayLoan) => {
    await fetch(`${endpoints.payLoan}?cpf=${cpf}&loanId=${loanId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // TODO: Calcula câmbio
  // const currencyExc = async () => {};

  return { sendPix, sendBankDeposit, addMoney, applyLoan, payLoan };
};
