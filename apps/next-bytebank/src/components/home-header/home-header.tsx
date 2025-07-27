import Image from "next/image";
import styles from "./home-header.module.scss";
import { useRouter } from "next/router";
import { BtnClasses } from "../../utils/types";
import { Button } from "@bytebank/ui";

export const HomeHeader = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Image src="/bytebank-logo.svg" alt="Logo" width={170} height={40} />

      <div>
        <Button
          click={() => router.push("/auth/login")}
          text="Acessar conta"
          btnClass={BtnClasses.HIGHLIGHT}
        />
      </div>
    </header>
  );
};
