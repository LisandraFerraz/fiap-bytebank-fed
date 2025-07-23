"use client";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { Shortcuts } from "@components/shortcuts/shortcuts";
import { useEffect, useState } from "react";
import { UseAccount } from "../../utils/hooks/useAccount";
import { UserDataStore } from "../../stores/user-data-store";
import { IUsuario } from "../../utils/interfaces/user";
import { IConta } from "../../utils/interfaces/conta";

export default function TransactionsLayout() {
  const { getAccountDetails } = UseAccount();

  const { user } = UserDataStore((state) => state.data);

  const [accountDetails, setAccountDetails] = useState<IUsuario>();
  const [trasnDetails, setTransDetails] = useState<Partial<IConta>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.cpf) {
      getAccountDetails().then((data: any) => {
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
