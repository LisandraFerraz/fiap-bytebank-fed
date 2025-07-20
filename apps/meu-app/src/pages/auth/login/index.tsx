import styles from "./styles.module.scss";
import { AuthTemplate } from "../_template";
import Image from "next/image";
import { UseUser } from "../../../utils/hooks/useUser";
import { useEffect, useState } from "react";
import { LoginBody } from "../../../utils/interfaces/user";
import { InputText } from "@components/input-text/input-text";
import { BtnClasses, Button } from "@components/button/button";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { getUserInfo } = UseUser();

  const [userBody, setUserBody] = useState<LoginBody>(new LoginBody());

  useEffect(() => {
    let c = document.cookie;

    console.log(c);
  });

  const handleLogin = async () => {
    const { status } = await getUserInfo(userBody);
    if (status === 200) {
      router.push("/transactions");
    }
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
