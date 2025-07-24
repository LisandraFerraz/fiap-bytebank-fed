export enum TransacationTypes {
  DEPOSITO = "DEPOSITO",
  TED = "TED",
  EMPRESTIMO = "EMPRESTIMO",
  PIX = "PIX",
}

export enum TransPeriod {
  RECENT = "RECENT",
  OLD = "OLD",
  NULL = "NULL",
}

export interface ITed {
  id?: string;
  data?: string;
  valor: number;
  cpfDestinatario: string;
  numConta: number;
  agencia: string;
  digito: number;
  descricao: string;
  tipo: TransacationTypes.TED;
  file?: any;
}
export interface IPix {
  data?: string;
  valor: number;
  descricao: string;
  chavePix: string;
  destinatario: string; // nome
  tipo: TransacationTypes.PIX;
  file?: any;
}

export interface IEmprestimo {
  id: string;
  valor: number; // valor do empréstimo
  data: string;
  aberto?: boolean;
  tipo: TransacationTypes;
  valorPago: number; // valor para pagar o empréstimo
  valorDevido: number | 0; // seu valor só é alterado no BFF
  file?: any;
}

export interface IDeposito {
  id: string;
  valor: number;
  data: string;
  tipo: TransacationTypes.DEPOSITO;
  file?: any;
}

// === FILTROS ===
export class TransactionFilter {
  transType: TransacationTypes | string = "";
  transPeriod: TransPeriod | string = "";
}
