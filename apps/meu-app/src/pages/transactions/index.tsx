"use client";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { Shortcuts } from "@components/shortcuts/shortcuts";
import { useUserContext } from "../../context/user-context";
import { useEffect, useState } from "react";
import { UseAccount } from "../../utils/hooks/useAccount";

export default function TransactionsLayout() {
  const { getAccountDetails } = UseAccount();
  const { user } = useUserContext();

  const [accountDetails, setAccountDetails] = useState<any>();
  const [trasnDetails, setTransDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.cpf) {
      getAccountDetails().then((data) => {
        setAccountDetails(data.accountDetails);
        setTransDetails(data.transHistory);

        setIsLoading(false);
      });
    }
  }, [user?.cpf]);

  return (
    <>
      {!isLoading && (
        <div className={styles.content}>
          <StatementLayout data={accountDetails} />
          <Shortcuts />
          <TransactionList data={trasnDetails} />
        </div>
      )}
    </>
  );
}
