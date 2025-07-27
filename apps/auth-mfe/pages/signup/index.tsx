import styles from "./signup.module.scss";
import { Button, InputText } from "@bytebank/ui";
import { AuthTemplate } from "../components/auth-template/auth-template";
import { UseUser } from "@/utils/hooks/useUser";
import { useState } from "react";
import { NewAccoutnBody, SignupUserBody } from "@/utils/classes/login";
import { BtnClasses } from "@/utils/btn-types.enum";
import { useRouter } from "next/router";
import Link from "next/link";
import { hasEmptyValues } from "@bytebank/utils";

export default function Signup() {
  const router = useRouter();
  const { registerUser, registerAccount } = UseUser();

  const [userBody, setUserBody] = useState<SignupUserBody>(
    new SignupUserBody()
  );

  const [newAccoutnBody, setNewAccoutnBody] = useState<NewAccoutnBody>(
    new NewAccoutnBody()
  );

  const updateUserBody = (key: string, value: string) => {
    if (value) {
      setUserBody({
        ...userBody,
        [key]: value,
      });
      if (key == "usuarioCpf") {
        setNewAccoutnBody({
          ...newAccoutnBody,
          usuarioCpf: userBody.cpf,
        });
      }
    }
  };

  const updateNovaConta = (key: string, value: string) => {
    if (value) {
      setNewAccoutnBody({
        ...newAccoutnBody,
        usuarioCpf: userBody.cpf,
        [key]: value,
      });
    }
  };

  const handleSignup = () => {
    if (!hasEmptyValues(userBody) && !hasEmptyValues(newAccoutnBody)) {
      registerUser(userBody).then(() => {
        registerAccount(newAccoutnBody);
        router.push("/");
      });
    }
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
            onChange={(e) => updateUserBody("nome", e.target.value)}
          />
        </div>
        <div className={styles.form_row}>
          <InputText
            id="dataNascimento"
            label="Data de Nascimento"
            placeHolder="DD-MM-AAAA"
            type="text"
            onChange={(e) => updateUserBody("dataNascimento", e.target.value)}
          />
          <InputText
            id="usuarioCpf"
            label="Seu CPF"
            placeHolder="000.000.000-00"
            type="text"
            onChange={(e) => updateUserBody("cpf", e.target.value)}
          />
        </div>
        <div className={styles.form_row}>
          <InputText
            id="email"
            label="E-mail"
            placeHolder="000"
            type="email"
            onChange={(e) => updateUserBody("email", e.target.value)}
          />
          <InputText
            id="password"
            label="Crie uma senha"
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
            type="text"
            onChange={(e) => updateNovaConta("agencia", e.target.value)}
          />
          <InputText
            id="numeroConta"
            label="Número da conta"
            placeHolder="Registre uma conta bancária"
            type="text"
            onChange={(e) => updateNovaConta("numeroConta", e.target.value)}
          />
          <InputText
            id="digito"
            label="Digíto"
            placeHolder="0"
            type="text"
            onChange={(e) => updateNovaConta("digito", e.target.value)}
          />
        </div>
        <div className={styles.form_row}>
          <InputText
            id="linhaCredito"
            label="Linha de crédito"
            placeHolder="Linha de crédito"
            type="text"
            onChange={(e) => updateNovaConta("linhaCredito", e.target.value)}
          />

          <InputText
            id="saldo"
            label="Saldo disponível"
            placeHolder="Cadastre um saldo disponível"
            type="text"
            onChange={(e) => updateNovaConta("saldo", e.target.value)}
          />
        </div>
        <div className={styles.bottom_btn}>
          <Link href={"/"}>Já tem uma conta? Faça o login</Link>
          <Button type="submit" btnClass={BtnClasses.CONFIRM} text="Entrar" />
        </div>
      </form>
    </AuthTemplate>
  );
}
