import { Pagination } from "./pagination";
import { IDeposito, IEmprestimo, IPix, ITed } from "./transaction";

export interface IConta {
  _id?: number;
  numeroConta: string;
  digito: number;
  usuarioCpf: string;
  linhaCredito: number;
  agencia: string;
  saldo: number;
  transacoesList: ITransacoes;
}

export interface IUserConta {
  _id?: number;
  numeroConta: string;
  digito: number;
  usuarioCpf: string;
  linhaCredito: number;
  agencia: string;
  saldo: number;
}

export interface IUserTransactions {
  depositos: IDeposito[];
  transferencias: ITed[] | IPix[];
  historicoEmprestimos: IEmprestimo[];
}

export interface ITransacoes {
  transacoes: any[];
  paginacao: Pagination;
}
