import { IConta, IUserConta } from "./conta";

export class LoginBody {
  email: string = "";
  password: string = "";
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

export interface IUsuarioConta {
  usuario: IUsuario;
  contaBancaria: IConta;
}

// response do login bff
export interface UserData {
  access_token: string;
  user: IUsuario | null;
  account: IUserConta | null;
}

export interface IResumoConta {
  id: string;
  numeroConta: number;
  digito: number;
  usuarioCpf: string;
  agencia: string;
  linhaCredito: number;
  saldo: number;
}
