import { Icon, Title } from "@bytebank/ui";
import styles from "./balance.module.scss";
import { useEffect, useState } from "react";

export const Balance = ({ data }: any) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  useEffect(() => {
    console.log("balance  ", data);
  }, []);
  if (!data?.account?.saldo) return;

  return (
    <div className={styles.balance}>
      <Title text="Saldo" size="base" />
      <span className={styles.divisor} />
      <p className={styles.balance_type_title}>Conta Corrente</p>
      <div className={styles.balance_info}>
        <p>R$ {showBalance ? data?.account?.saldo : "*****"}</p>
        <button onClick={() => setShowBalance(!showBalance)}>
          <Icon iconKey={showBalance ? "show" : "hide"} />
        </button>
      </div>
    </div>
  );
};
