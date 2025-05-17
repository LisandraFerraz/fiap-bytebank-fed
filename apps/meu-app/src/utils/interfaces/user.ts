import { IConta } from "./conta";

export interface IUsuario {
  id: 1;
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
