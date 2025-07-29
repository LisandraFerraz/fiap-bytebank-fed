import Image from "next/image";
import styles from "./auth-template.module.scss";
import { Title } from "@bytebank/ui";

export default function AuthTemplate({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
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
        </div>
        <div className={styles.auth_form}>
          <div className={styles.form_top}>
            <Image
              className={styles.image}
              src="/bytebank-logo.svg"
              alt="Banner"
              width={800}
              height={500}
            />
            <Title text={title} size="lg" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
