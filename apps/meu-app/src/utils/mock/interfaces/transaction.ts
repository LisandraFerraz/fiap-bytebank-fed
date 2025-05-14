enum TransacationTypes {
  DEPOSITO = "Depósito",
  TRANSAFERENCIA = "Transferência",
}

export interface ITransaction {
  data: string;
  tipo: TransacationTypes;
  valor: string;
}
