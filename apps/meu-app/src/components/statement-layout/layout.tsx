"use client";

import { Balance } from "@components/balance/balance";
import styles from "./statement.module.scss";
import { BtnClasses, Button } from "@components/button/button";
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
          btnClass={BtnClasses.CONFIRM}
          iconKey="addMoney"
          text="Adicionar dinheiro"
          click={() => router.push("/add-money")}
        />
        <Button
          btnClass={BtnClasses.CONFIRM}
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
