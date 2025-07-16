import {
  IDeposito,
  IEmprestimo,
  IPix,
  ITed,
  TransacationTypes,
} from "./transaction";

export interface IConta {
  _id?: number;
  numeroConta: string;
  digito: number;
  usuarioCpf: string;
  linhaCredito: number;
  agencia: string;
  saldo: number;
  depositos: IDeposito[];
  transferencias: ITed[] | IPix[];
  historicoEmprestimos: IEmprestimo[];
}
