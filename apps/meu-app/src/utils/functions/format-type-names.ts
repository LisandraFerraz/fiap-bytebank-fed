import { TransacationTypes } from "../interfaces/transaction";

export function FormatTypeName(typeN: TransacationTypes) {
  const checkType: { [key: string]: string } = {
    [TransacationTypes.DEPOSITO]: "Depósito",
    [TransacationTypes.EMPRESTIMO]: "Empréstimo",
    [TransacationTypes.PIX]: "PIX",
    [TransacationTypes.TED]: "TED",
  };

  return checkType[typeN];
}
