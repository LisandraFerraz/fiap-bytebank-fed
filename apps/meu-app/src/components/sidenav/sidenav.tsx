import Image from "next/image";
import styles from "./sidenav.module.scss";
import { Icon } from "@components/icon/icon";
import Link from "next/link";
import { useUserContext } from "../../context/user-context";
import { useEffect } from "react";

export const Sidenav = () => {
  const { user } = useUserContext();

  const dateNow = new Date();

  return (
    <div className={styles.sidenav}>
      <div className={styles.sidenav_top}>
        <Link href="/">
          <Image src="/bytebank-logo.svg" alt="Logo" width={170} height={40} />
        </Link>
        <div>
          <ul>
            <li>
              <Link href={"/"}>
                <Icon iconKey="transaction" />
                Transferências
              </Link>
            </li>
            <li>
              <Link href={"/loan"}>
                <Icon iconKey="requestLoan" />
                Empréstimos
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {user && (
        <div className={styles.sidenav_card}>
          <div className={styles.card_top}>
            <h2>Olá, {user?.nome}! :) </h2>
          </div>
          <div className={styles.card_bottom}>
            <p>{String(dateNow)}</p>
          </div>
        </div>
      )}
    </div>
  );
};
