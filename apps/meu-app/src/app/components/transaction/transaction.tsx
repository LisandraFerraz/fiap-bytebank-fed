import styles from "./transaction.module.scss";

import { Icon } from "components/icon/icon";
import {
  ITransaction,
  TransacationTypes,
} from "../../../utils/mock/interfaces/transaction";

export const Transaction = ({ dataT }: { dataT: ITransaction }) => {
  const isDeposit = dataT?.tipo === TransacationTypes.DEPOSITO;
  return (
    <div className={styles.transaction}>
      <span
        className={`${styles.icon} ${
          isDeposit ? styles.deposit : styles.expanse
        }`}
      >
        <Icon iconKey={isDeposit ? "deposit" : "expanse"} />
      </span>
      <div>
        <p>{dataT.data}</p>
        <p>{dataT.tipo}</p>
        <p>{dataT.valor}</p>
      </div>
    </div>
  );
};
