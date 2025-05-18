import { IDepositos, ITransferencia } from "./transaction";

export interface IConta {
  id?: number;
  numeroConta: string;
  digito: number;
  usuarioCpf: string;
  linhaCredito: number;
  agencia: string;
  saldo: number;
  depositos: IDepositos;
  transferencias: ITransferencia;
}
