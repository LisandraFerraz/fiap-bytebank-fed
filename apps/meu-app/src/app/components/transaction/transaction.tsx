import styles from "./transaction.module.scss";

import { Icon } from "components/icon/icon";
import {
  ITransaction,
  TransacationTypes,
} from "../../../utils/mock/interfaces/transaction";
import { Button } from "components/button/button";

export const Transaction = ({ dataT }: { dataT: ITransaction }) => {
  const isDeposit = dataT?.tipo === TransacationTypes.DEPOSITO;
  return (
    <div className={styles.transaction}>
      <div className={styles.transaction_content}>
        <span
          className={`${styles.icon} ${
            isDeposit ? styles.deposit : styles.expanse
          }`}
        >
          <Icon iconKey={isDeposit ? "deposit" : "expanse"} />
        </span>
        <div>
          <p className={styles.transaction_date}>{dataT.data}</p>
          <p>{dataT.tipo}</p>
          <p className={styles.transaction_value}>{dataT.valor}</p>
        </div>
      </div>
      <Button btnClass={styles.details_btn} text="Visualizar" />
    </div>
  );
};
