import styles from "./login.module.scss";
import Image from "next/image";
import { useState } from "react";
import { Button, InputText } from "@bytebank/ui";
import { useRouter } from "next/router";
import { LoginBody } from "@/utils/classes/login";
import { UserDataStore } from "@/stores/user-data-store";
import { AuthTemplate } from "./components/auth-template/auth-template";
import { UseUser } from "@/utils/hooks/useUser";

enum BtnClasses {
  CONFIRM = "CONFIRM",
  DEFAULT = "DEFAULT",
  HIGHLIGHT = "HIGHLIGHT",
  DELETE = "",
}

export default function Login() {
  const router = useRouter();
  const { loginUser } = UseUser();

  const [userBody, setUserBody] = useState<LoginBody>(new LoginBody());

  const setUserData = UserDataStore((state) => state.setUserData);

  const handleLogin = async () => {
    const data = await loginUser(userBody);
    const { access_token, account, user } = data;
    setUserData({ access_token, account, user });
    window.location.href = "/transactions";
  };

  const updateBody = (key: string, value: string) => {
    setUserBody({
      ...userBody,
      [key]: value,
    });
  };

  return (
    <>
      <AuthTemplate>
        <div className={styles.container}>
          <div className={styles.form_top}>
            <Image
              className={styles.image}
              src="/bytebank-logo.svg"
              alt="Banner"
              width={800}
              height={500}
            />
            <p>Autentique-se</p>
          </div>

          <form action={handleLogin}>
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
              <Button
                type="submit"
                btnClass={BtnClasses.CONFIRM}
                text="Entrar"
              />
            </div>
          </form>
        </div>
      </AuthTemplate>
    </>
  );
}
