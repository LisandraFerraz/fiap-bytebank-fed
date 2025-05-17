"use client";
import { Sidenav } from "@components/sidenav/sidenav";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      const resBff = await fetch("/api/user?cpf=32165498722");

      const json = await resBff.json();
      console.log(json);
      return json;
    };

    getData();
  }, []);

  return (
    <div className={styles.homepage}>
      <Sidenav />
      <div className={styles.content}>
        <StatementLayout />
        <TransactionList />
      </div>
    </div>
  );
}
