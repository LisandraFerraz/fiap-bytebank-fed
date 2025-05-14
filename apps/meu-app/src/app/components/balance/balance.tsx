import { Icon } from "components/icon/icon";
import styles from "./balance.module.scss";
import { Title } from "components/title-text/title-text";

export const Balance = () => {
  const balanceAmount = "2.500,00";

  return (
    <div className={styles.balance}>
      <Title text="Saldo" />
      <span className={styles.divisor} />
      <p className={styles.balance_type_title}>Conta Corrente</p>
      <div className={styles.balance_info}>
        <p>R$ {balanceAmount}</p>
        <Icon iconKey="show" />
      </div>
    </div>
  );
};
