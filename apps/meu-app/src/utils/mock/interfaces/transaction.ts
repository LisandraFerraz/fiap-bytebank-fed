export enum TransacationTypes {
  DEPOSITO = "DEPOSITO",
  TRANSAFERENCIA = "TRANSFERENCIA",
}

export interface ITransaction {
  data: string;
  tipo: TransacationTypes;
  valor: string;
}
