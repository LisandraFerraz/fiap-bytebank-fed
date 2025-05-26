export enum TransacationTypes {
  DEPOSITO = "DEPOSITO",
  TRANSFERENCIA = "TRANSFERENCIA",
  EMPRESTIMO = "EMPRESTIMO",
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
  tipo: TransacationTypes.TRANSFERENCIA;
}
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

export interface IEmprestimo {
  id: string;
  valor: number;
  data: string;
  aberto?: boolean;
  tipo: TransacationTypes;
  valorPago: number; // somente para pagamento de emprestimo
}

export interface IDeposito {
  id: string;
  valor: number | string;
  data: string;
  tipo: TransacationTypes.DEPOSITO;
}
