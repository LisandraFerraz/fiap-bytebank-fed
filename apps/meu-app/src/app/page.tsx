import { Sidenav } from "components/sidenav/sidenav";
import styles from "./main.module.scss";
import { StatementLayout } from "components/statement-layout/layout";
import { TransactionList } from "components/transactions-list/transaction-list";

export default function Home() {
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
