import React from "react";
import styles from "./template.module.scss";
import Image from "next/image";

export const AuthTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.side_deco}>
          <Image
            className={styles.image}
            src="/banner-illustration.svg"
            alt="Banner"
            width={800}
            height={500}
          />
          <p>Experimente mais liberdade no controle da sua vida financeira.</p>
          <p>Crie sua conta com a gente!</p>
        </div>
        <div className={styles.auth_form}>{children}</div>
      </div>
    </>
  );
};
