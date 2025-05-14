import { Balance } from "components/balance/balance";
import styles from "./statement.module.scss";
import { Button } from "components/button/button";

export const StatementLayout = () => {
  return (
    <div className={styles.statLayout}>
      <Balance />
      <div className={styles.actions}>
        <Button
          btnClass={styles.btn}
          iconKey="addMoney"
          text="Adicionar dinheiro"
        />
        <Button
          btnClass={styles.btn}
          iconKey="transaction"
          text="Nova transação"
        />
      </div>
    </div>
  );
};
