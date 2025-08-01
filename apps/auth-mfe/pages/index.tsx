import styles from "./login.module.scss";
import { useState } from "react";
import { Button, InputText } from "@bytebank/ui";
import { LoginBody } from "@/utils/classes/login";
import { UserDataStore } from "@/stores/user-data-store";
import { UseUser } from "@/utils/hooks/useUser";
import { BtnClasses } from "@/utils/btn-types.enum";
import Link from "next/link";
import AuthTemplate from "./components/auth-template/auth-template";

export default function Login() {
  const { loginUser } = UseUser();

  const [userBody, setUserBody] = useState<LoginBody>(new LoginBody());

  const setUserData = UserDataStore((state) => state.setUserData);

  const handleLogin = async () => {
    const data = await loginUser(userBody);
    const { access_token, account, user } = data;
    setUserData({ access_token, account, user });
    window.location.href = "/dashboard";
  };

  const updateBody = (key: string, value: string) => {
    setUserBody({
      ...userBody,
      [key]: value,
    });
  };

  return (
    <>
      <AuthTemplate title="Autentique-se">
        <form action={handleLogin} className={styles.form}>
          <InputText
            id="email"
            label="E-mail"
            placeHolder="seu@email.com.br"
            value={userBody.email}
            type="email"
            onChange={(e) => updateBody("email", e.target.value)}
          />
          <InputText
            id="password"
            label="Senha"
            placeHolder="Sua senha"
            value={userBody.password}
            type="password"
            onChange={(e) => updateBody("password", e.target.value)}
          />
          <div className={styles.submit_btn}>
            <Link href={"/signup"}>Cadastre-se</Link>
            <Button type="submit" btnClass={BtnClasses.CONFIRM} text="Entrar" />
          </div>
        </form>
      </AuthTemplate>
    </>
  );
}
