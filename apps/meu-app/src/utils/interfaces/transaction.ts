export enum TransacationTypes {
  DEPOSITO = "DEPOSITO",
  TED = "TED",
  EMPRESTIMO = "EMPRESTIMO",
  PIX = "PIX",
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
}
export interface IPix {
  id?: string;
  valor: number;
  data?: string;
  descricao: string;
  chavePix: string;
  tipo: TransacationTypes.PIX;
}

export interface IEmprestimo {
  id: string;
  valor: number; // valor do empréstimo
  data: string;
  aberto?: boolean;
  tipo: TransacationTypes;
  valorPago: number; // valor para pagar o empréstimo
  valorDevido: number | 0; // seu valor só é alterado no BFF
}

export interface IDeposito {
  id: string;
  valor: number | string;
  data: string;
  tipo: TransacationTypes.DEPOSITO;
}

export interface ITransacao {
  id?: string;
  conta: string | null; // destino/origem a depender do tipo
  valor: number;
  data: string;
  descricao: string;
  tipo: TransacationTypes;
  cpf: string;
  nome: string;
}
