import styles from "./signup.module.scss";
import { Button, InputText } from "@bytebank/ui";
import AuthTemplate from "../components/auth-template/auth-template";
import { UseUser } from "@/utils/hooks/useUser";
import { useState } from "react";
import { NewAccountBody, SignupUserBody } from "@/utils/classes/login";
import { BtnClasses } from "@/utils/btn-types.enum";
import { useRouter } from "next/router";
import Link from "next/link";
import { isAuthFormInvalid, isEmailValid } from "@bytebank/utils";

export default function Signup() {
  const router = useRouter();
  const { registerUser, registerAccount } = UseUser();

  const [userBody, setUserBody] = useState<SignupUserBody>(
    new SignupUserBody()
  );

  const [newAccountBody, setNewAccountBody] = useState<NewAccountBody>(
    new NewAccountBody()
  );

  const updateUserBody = (key: string, value: string) => {
    if (value) {
      setUserBody({
        ...userBody,
        [key]: value,
      });
      if (key == "usuarioCpf") {
        setNewAccountBody({
          ...newAccountBody,
          usuarioCpf: userBody.cpf,
        });
      }
    }
  };

  const updateNovaConta = (key: string, value: string) => {
    if (value) {
      setNewAccountBody({
        ...newAccountBody,
        usuarioCpf: userBody.cpf,
        [key]: value,
      });
    }
  };

  const handleSignup = () => {
    if (!isAuthFormInvalid(userBody) && !isAuthFormInvalid(newAccountBody)) {
      registerUser(userBody).then(() => {
        registerAccount(newAccountBody);
        router.push("/");
      });
    }
  };

  const currencyBlocks = {
    currency: {
      mask: Number,
      thousandsSeparator: ".",
      radix: ".",
      mapToRadix: ["."],
      scale: 1,
      normalizeZeros: true,
      padFractionalZeros: true,
    },
  };

  return (
    <AuthTemplate title="Criar conta">
      <form action={handleSignup} className={styles.form}>
        {/* Dados pessoais */}
        <div className={styles.form_row}>
          <InputText
            id="nome"
            label="Nome"
            placeHolder="Seu nome"
            type="text"
            errorMsg={
              userBody.nome && userBody.nome.length < 3
                ? "(deve conter mais de 6 caracteres)"
                : ""
            }
            onChange={(e) => updateUserBody("nome", e.target.value)}
          />
        </div>
        <div className={styles.form_row}>
          <InputText
            id="dataNascimento"
            label="Data de Nascimento"
            placeHolder="DD-MM-AAAA"
            mask="00/00/0000"
            type="text"
            errorMsg={
              userBody.dataNascimento && userBody.dataNascimento.length < 8
                ? "(incompleto)"
                : ""
            }
            onChange={(e) => updateUserBody("dataNascimento", e.target.value)}
          />
          <InputText
            id="usuarioCpf"
            label="Seu CPF"
            placeHolder="000.000.000-00"
            mask="000.000.000-00"
            type="text"
            errorMsg={
              userBody.cpf && userBody.cpf.length < 11 ? "(inválido)" : ""
            }
            onChange={(e) => updateUserBody("cpf", e.target.value)}
          />
        </div>
        <div className={styles.form_row}>
          <InputText
            id="email"
            label="E-mail"
            placeHolder="seu@email.com"
            type="email"
            errorMsg={
              userBody.email && !isEmailValid(userBody.email)
                ? "(inválido)"
                : ""
            }
            onChange={(e) => updateUserBody("email", e.target.value)}
          />
          <InputText
            id="password"
            label="Senha"
            errorMsg={
              userBody.password && userBody.password.length < 6
                ? "(deve conter 6 dígitos)"
                : ""
            }
            placeHolder="******"
            type="text"
            onChange={(e) => updateUserBody("password", e.target.value)}
          />
        </div>

        {/* Conta bancaria */}
        <div className={styles.form_row}>
          <InputText
            id="agencia"
            label="Agência"
            placeHolder="000"
            mask="000"
            type="text"
            errorMsg={
              newAccountBody.agencia && newAccountBody.agencia.length < 3
                ? "(insira 3 dígitos)"
                : ""
            }
            onChange={(e) => updateNovaConta("agencia", e.target.value)}
          />
          <InputText
            id="numeroConta"
            label="Número da conta"
            placeHolder="Registre uma conta bancária"
            mask="000000"
            type="text"
            errorMsg={
              newAccountBody.numeroConta &&
              String(newAccountBody.numeroConta).length < 6
                ? "(insira 3 dígitos)"
                : ""
            }
            onChange={(e) => updateNovaConta("numeroConta", e.target.value)}
          />
          <InputText
            id="digito"
            label="Digíto"
            placeHolder="0"
            mask="0"
            type="text"
            onChange={(e) => updateNovaConta("digito", e.target.value)}
          />
        </div>
        <div className={styles.form_row}>
          <InputText
            id="linhaCredito"
            label="Linha de crédito"
            placeHolder="R$ 0.000"
            type="text"
            mask="R$ currency"
            blocks={currencyBlocks}
            onChange={(e) => updateNovaConta("linhaCredito", e.target.value)}
          />
          <InputText
            id="saldo"
            label="Saldo disponível"
            placeHolder="R$ 0.000"
            type="text"
            mask="R$ currency"
            blocks={currencyBlocks}
            onChange={(e) => updateNovaConta("saldo", e.target.value)}
          />
        </div>
        <div className={styles.bottom_btn}>
          <Link href={"/"}>Já tem uma conta? Faça o login</Link>
          <Button
            disabled={
              isAuthFormInvalid(userBody) || isAuthFormInvalid(newAccountBody)
            }
            type="submit"
            btnClass={BtnClasses.CONFIRM}
            text="Entrar"
          />
        </div>
      </form>
    </AuthTemplate>
  );
}
