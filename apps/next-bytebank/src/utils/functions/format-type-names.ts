import { TransacationTypes, TransPeriod } from "../interfaces/transaction";

export function FormatTypeName(typeN: TransacationTypes | string) {
  const checkType: { [key: string]: string } = {
    [TransacationTypes.DEPOSITO]: "Depósito",
    [TransacationTypes.EMPRESTIMO]: "Empréstimo",
    [TransacationTypes.PIX]: "PIX",
    [TransacationTypes.TED]: "TED",
  };

  return checkType[typeN];
}

export function FormatPeriodFilter(period: TransPeriod | string) {
  const checkPeriod: { [key: string]: string } = {
    [TransPeriod.RECENT]: "Recente",
    [TransPeriod.OLD]: "Antigo",
  };

  return checkPeriod[period];
}
