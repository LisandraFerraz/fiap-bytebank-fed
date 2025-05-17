import { IDepositos, ITransferencia } from "./transaction";

export interface IConta {
  numeroConta: string;
  digito: number;
  usuarioCpf: string;
  agencia: string;
  saldo: number;
  depositos: IDepositos;
  transferencias: ITransferencia;
}
