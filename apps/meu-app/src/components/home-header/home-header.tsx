import Image from "next/image";
import styles from "./home-header.module.scss";
import { BtnClasses, Button } from "@components/button/button";
import { useRouter } from "next/router";

export const HomeHeader = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Image src="/bytebank-logo.svg" alt="Logo" width={170} height={40} />

      <div>
        <Button
          click={() => router.push("/transactions")}
          text="Acessar Mock"
          btnClass={BtnClasses.HIGHLIGHT}
        />
      </div>
    </header>
  );
};
