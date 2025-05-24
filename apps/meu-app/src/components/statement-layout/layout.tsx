"use client";

import { Balance } from "@components/balance/balance";
import styles from "./statement.module.scss";
import { Button } from "@components/button/button";
import { TransactionModal } from "@components/transaction-modal/transaction-modal";
import { useState } from "react";
import { TransacationTypes } from "../../utils/interfaces/transaction";
import { useRouter } from "next/navigation";

export const StatementLayout = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <div className={styles.statLayout}>
      <Balance />
      <div className={styles.actions}>
        <Button
          btnClass={styles.btn}
          iconKey="addMoney"
          text="Adicionar dinheiro"
          click={() => router.push("/add-money")}
        />
        <Button
          btnClass={styles.btn}
          iconKey="transaction"
          text="Nova transação"
          click={() => router.push("/new-transaction")}
        />
      </div>
      {/* {showModal && (
        <TransactionModal transactionType={TransacationTypes.DEPOSITO} />
      )} */}
    </div>
  );
};
