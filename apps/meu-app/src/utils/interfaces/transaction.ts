export enum TransacationTypes {
  DEPOSITO = "DEPOSITO",
  TRANSAFERENCIA = "TRANSFERENCIA",
}

export interface ITransferencia {
  id: number;
  contaOrigem: string | null;
  valor: number;
  data: string;
  descricao: string;
}

export interface IDepositos {
  id: number;
  contaDestino: string | null;
  valor: number;
  data: string;
  descricao: string;
}

export interface ITransacao {
  id: number;
  contaDestino: string | null; // destino/origem a depender do tipo
  valor: number;
  data: string;
  descricao: string;
  tipo: TransacationTypes;
}
