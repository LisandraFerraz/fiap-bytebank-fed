// response do login bff
export interface UserData {
  access_token: string;
  user: IUsuario | null;
  account: IUserConta | null;
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

export interface IUsuario {
  _id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  dadosBancarios: {
    numeroConta: string;
    agencia: string;
    digito: number;
    chavePix: string;
  };
  login: {
    email: string;
    password: string;
  };
}
