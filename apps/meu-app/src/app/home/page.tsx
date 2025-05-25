"use client";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";

export default function Home() {
  const dateNow = new Date();

  return (
    <div className={styles.content}>
      <StatementLayout />
      <TransactionList />
    </div>
  );
}
