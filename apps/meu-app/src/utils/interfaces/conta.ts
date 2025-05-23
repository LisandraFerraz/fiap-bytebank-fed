import { IDepositos } from "./transaction";

export interface IConta {
  id?: number;
  numeroConta: string;
  digito: number;
  usuarioCpf: string;
  linhaCredito: number;
  agencia: string;
  saldo: number;
  depositos: IDepositos;
  transferencias: ITransferenciaG;
  historicoEmprestimos: IEmprestimos;
}

interface IEmprestimos {
  id?: string;
  data: string;
  valor: number;
  aberto: boolean;
}

interface ITransferenciaG {
  id?: number;
  valor: number;
  data: string;
  descricao: string;
}
