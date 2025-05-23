export enum TransacationTypes {
  DEPOSITO = "DEPOSITO",
  TRANSAFERENCIA = "TRANSFERENCIA",
}

// mantén
export interface ITed {
  id?: number;
  valor: number;
  data: string;
  descricao: string;
  pix?: string;
  numConta?: string;
}
// mantén
export interface IPix {
  id?: number;
  valor: number;
  data: string;
  descricao: string;
  chavePix: string;
}

// mantén
export interface IDepositos {
  id?: number;
  contaDestino: string | null;
  valor: number;
  data: string;
  descricao: string;
}

// mantén
// export interface ITransacao {
//   id?: number;
//   contaDestino: string | null; // destino/origem a depender do tipo
//   valor: number;
//   data: string;
//   descricao: string;
//   tipo: TransacationTypes;
// }

export interface IPayLoan {
  id?: number;
  valorPago: number;
  data: Date;
}
