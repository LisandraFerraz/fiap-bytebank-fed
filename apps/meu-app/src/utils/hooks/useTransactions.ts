import { endpoints } from "../../app/api/_environment/endpoints";
import { ITransferencia, TransacationTypes } from "../interfaces/transaction";

export const UseTransactions = () => {
  // Envia dinheiro
  const sendMoney = (
    cpf: string,
    contaDestino: string,
    body: ITransferencia
  ) => {
    return fetch(
      `${endpoints.sendMoney}?cpf=${cpf}&contaDestino=${contaDestino}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
  };

  // Adiciona dinheiro na propria conta
  const addMoney = async (contaDestino: string, body: ITransferencia) => {
    return fetch(`${endpoints.addMoney}?contaDestino=${contaDestino}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  // Calcula câmbio
  const currencyExc = async () => {};

  // Pede empréstimo
  const applyLoan = async () => {};

  return { sendMoney, addMoney };
};
