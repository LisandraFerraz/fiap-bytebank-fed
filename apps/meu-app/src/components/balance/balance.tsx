import { Icon } from "@components/icon/icon";
import styles from "./balance.module.scss";
import { Title } from "@components/title-text/title-text";
import { useState } from "react";

interface IBalance {
  amount: number;
}

export const Balance = ({ amount }: IBalance) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  return (
    <div className={styles.balance}>
      <Title text="Saldo" />
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
