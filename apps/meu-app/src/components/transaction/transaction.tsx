import styles from "./transaction.module.scss";

import { Icon } from "@components/icon/icon";

import { Button } from "@components/button/button";
import {
  ITransacao,
  TransacationTypes,
} from "../../utils/interfaces/transaction";

export const Transaction = ({ dataT }: { dataT: ITransacao }) => {
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
