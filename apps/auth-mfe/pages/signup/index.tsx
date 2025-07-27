import styles from "./signup.module.scss";
import { Button, InputText } from "@bytebank/ui";
import { AuthTemplate } from "../components/auth-template/auth-template";
import { UseUser } from "@/utils/hooks/useUser";
import { useState } from "react";
import { SignupBody } from "@/utils/classes/login";
import { BtnClasses } from "@/utils/btn-types.enum";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const { registerUser } = UseUser();

  const [userBody, setUserBody] = useState<SignupBody>(new SignupBody());

  const updateBody = (key: string, value: string) => {
    if (value) {
      setUserBody({
        ...userBody,
        [key]: value,
      });
    }
  };

  const handleSignup = () => {
    router.push("/auth");
  };

  return (
    <AuthTemplate title="Criar conta">
      <div>
        <form action={handleSignup} className={styles.form}>
          {/* <InputText
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
          /> */}
          <div className={styles.submit_btn}>
            <Button type="submit" btnClass={BtnClasses.CONFIRM} text="Entrar" />
          </div>
        </form>
      </div>
    </AuthTemplate>
  );
}
