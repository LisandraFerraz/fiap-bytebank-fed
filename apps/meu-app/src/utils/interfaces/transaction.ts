export enum TransacationTypes {
  DEPOSITO = "DEPOSITO",
  TRANSFERENCIA = "TRANSFERENCIA",
  EMPRESTIMO = "EMPRESTIMO",
}

// mantén
export interface ITed {
  id?: string;
  data?: string;
  valor: number;
  cpfDestinatario: string;
  numConta: number;
  agencia: string;
  digito: number;
  descricao: string;
  tipo: TransacationTypes.TRANSFERENCIA;
}
// mantén
export interface IPix {
  id?: string;
  valor: number;
  data?: string;
  descricao: string;
  chavePix: string;
  tipo: TransacationTypes.TRANSFERENCIA;
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

export interface IPayLoan {
  id?: string;
  valorPago: number;
  data: string;
}

export interface IDeposito {
  id: string;
  valor: number;
  data: string;
  tipo: TransacationTypes.DEPOSITO;
}
