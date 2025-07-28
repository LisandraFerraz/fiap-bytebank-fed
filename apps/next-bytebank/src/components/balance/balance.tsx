import { Icon, Title } from "@bytebank/ui";
import styles from "./balance.module.scss";
import { useState } from "react";

export const Balance = ({ amount }: { amount: number }) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  if (!amount) return;

  return (
    <div className={styles.balance}>
      <Title text="Saldo" size="base" />
      <span className={styles.divisor} />
      <p className={styles.balance_type_title}>Conta Corrente</p>
      <div className={styles.balance_info}>
        <p>R$ {showBalance ? amount : "*****"}</p>
        <button onClick={() => setShowBalance(!showBalance)}>
          <Icon iconKey={showBalance ? "show" : "hide"} />
        </button>
      </div>
    </div>
  );
};
