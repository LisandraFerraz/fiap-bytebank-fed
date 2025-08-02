export class LoginBody {
  email: string = "";
  password: string = "";
}

export class SignupUserBody {
  nome: string = "";
  cpf: string = "";
  dataNascimento: string = "";
  email: string = "";
  password: string = "";
}

export class NewAccountBody {
  numeroConta: number = 0;
  digito: number = 0;
  usuarioCpf: string = "";
  agencia: string = "";
  linhaCredito: number = 0;
  saldo: number = 0;
}
