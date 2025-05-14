"use client";

import styles from "./transaction-list.module.scss";

import { Title } from "components/title-text/title-text";
import { useState } from "react";
import { transactionsList } from "../../../utils/mock/transactions";
import { Transaction } from "components/transaction/transaction";

export const TransactionList = () => {
  const [transactions, setTransactions] = useState<any>(transactionsList);

  return (
    <div className={styles.transacions_list}>
      <Title text="Extrato" />
      {transactions.map((t: any, index: any) => (
        <Transaction dataT={t} key={index} />
      ))}
    </div>
  );
};
