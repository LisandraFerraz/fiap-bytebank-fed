"use client";

import { Balance } from "@components/balance/balance";
import styles from "./statement.module.scss";
import { Button } from "@components/button/button";
import { TransactionModal } from "@components/transaction-modal/transaction-modal";
import { useState } from "react";
import { TransacationTypes } from "../../utils/mock/interfaces/transaction";

export const StatementLayout = () => {
  const [showModal, setShowModal] = useState<boolean>(true);

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
      {showModal && (
        <TransactionModal transactionType={TransacationTypes.DEPOSITO} />
      )}
    </div>
  );
};
