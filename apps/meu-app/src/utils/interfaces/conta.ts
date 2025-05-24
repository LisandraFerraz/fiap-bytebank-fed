export interface IConta {
  id?: number;
  numeroConta: string;
  digito: number;
  usuarioCpf: string;
  linhaCredito: number;
  agencia: string;
  saldo: number;
  depositos: IDepositos[];
  transferencias: ITransferenciaG[];
  historicoEmprestimos: IEmprestimos[];
}

interface IEmprestimos {
  id?: string;
  data: string;
  valor: number;
  aberto: boolean;
}

interface ITransferenciaG {
  id?: number;
  destinatario: string;
  contaOrigem: string;
  valor: number;
  data: string;
  descricao: string;
}

interface IDepositos {
  id?: number;
  remetente?: string;
  contaDestino: string | null;
  valor: number;
  data: string;
  descricao: string;
  cpfRemetente: string;
}
