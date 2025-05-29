import Image from "next/image";
import styles from "./sidenav.module.scss";
import { Icon } from "@components/icon/icon";
import Link from "next/link";
import { useUserContext } from "../../context/user-context";
import { FormatDateName } from "../../utils/functions/format-date";

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
              <Link href={"/new-transaction"}>
                <Icon iconKey="requestLoan" />
                Transações
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {user && (
        <div className={styles.sidenav_card}>
          <div className={styles.card_top}>
            <h3>Olá, {user?.nome}! :) </h3>
          </div>
          <div className={styles.card_bottom}>
            <p>{FormatDateName(dateNow)}</p>
          </div>
        </div>
      )}
    </div>
  );
};
