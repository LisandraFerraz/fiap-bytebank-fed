import { endpoints } from "../../app/api/_environment/endpoints";
import { IPayLoan, IPix, ITed } from "../interfaces/transaction";

export const UseTransactions = () => {
  // Envia dinheiro
  const sendBankDeposit = (cpf: string, body: ITed) => {
    return fetch(`${endpoints.sendMoney}?cpf=${cpf}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const sendPix = (cpf: string, body: IPix) => {
    return fetch(`${endpoints.sendPix}?cpf=${cpf}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  // Adiciona dinheiro na propria conta
  const addMoney = async (contaDestino: string, body: ITed) => {
    return fetch(`${endpoints.addMoney}?contaDestino=${contaDestino}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  // Pede empréstimo
  const applyLoan = async (cpf: string, loan: number) => {
    return await fetch(`${endpoints.applyLoan}?cpf=${cpf}&loan=${loan}`, {
      method: "POST",
    });
  };

  const payLoan = async (cpf: string, loanId: string, body: IPayLoan) => {
    await fetch(`${endpoints.payLoan}?cpf=${cpf}&loanId=${loanId}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  // TODO: Calcula câmbio
  // const currencyExc = async () => {};

  return { sendPix, sendBankDeposit, addMoney, applyLoan, payLoan };
};
