"use client";

import { Sidenav } from "@components/sidenav/sidenav";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { useEffect } from "react";
import { UseTransactions } from "../../utils/hooks/useTransactions";
import { UseUser } from "../../utils/hooks/useUser";

export default function Home() {
  const { getUserInfo } = UseUser();

  useEffect(() => {
    const getData = async () => {
      const resBff = await getUserInfo("12345678901");
      console.log(resBff);
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
