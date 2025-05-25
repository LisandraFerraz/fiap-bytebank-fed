import Image from "next/image";
import styles from "./sidenav.module.scss";
import { Icon } from "@components/icon/icon";
import Link from "next/link";

export const Sidenav = () => {
  const name = "Joana";

  return (
    <div className={styles.sidenav}>
      <div className={styles.sidenav_top}>
        <Link href="/">
          <Image src="/bytebank-logo.svg" alt="Logo" width={170} height={40} />
        </Link>
        <div>
          <ul>
            <li>
              <Icon iconKey="transaction" />
              Transferências
            </li>
            <li>
              <Icon iconKey="investment" />
              Investimentos
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.sidenav_card}>
        {/* <Image
          src="/sidenav-card-bg.svg"
          alt="Sidenav Card Background Image"
          className={styles.card_bg}
        /> */}
        <div className={styles.card_top}>
          <h2>Olá, {name}! :) </h2>
          {/* <p>{String(dateNow)}</p> */}
        </div>
        <div className={styles.card_bottom}>
          Configurações do perfil <Icon iconKey="longArrow" />
        </div>
      </div>
    </div>
  );
};
