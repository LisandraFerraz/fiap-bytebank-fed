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
import { TransactionFilter } from "../../utils/interfaces/transaction";
import { Select } from "@components/inputs/input-select/input-select";
import { transPeriodMap, transTypesMap } from "./utils/transaction-maps";
import { Icon } from "@components/icon/icon";

export default function TransactionsLayout() {
  const { getAccountDetails } = UseAccount();

  const { user } = UserDataStore((state) => state.data);

  const [accountDetails, setAccountDetails] = useState<IUsuario>();
  const [trasactionList, setTransactionList] = useState<Partial<IConta>>();
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<TransactionFilter>(
    new TransactionFilter()
  );

  useEffect(() => {
    if (user?.cpf) {
      getAccountDetails(filters).then((data: any) => {
        setAccountDetails(data.accountDetails);
        setTransactionList(data.transacoes);

        setIsLoading(false);
      });
    }
  }, [user?.cpf, filters]);

  const handleUpdateFilter = (e: any, key: string) => {
    e.preventDefault();
    setFilters({
      ...filters,
      [key]: e.target.value,
    });
  };

  return (
    <>
      {!isLoading && (
        <div className={styles.content}>
          <StatementLayout data={accountDetails} />
          <Shortcuts />
          <TransactionList data={trasactionList}>
            <div className={styles.filter_group}>
              {(filters.transPeriod || filters.transType) && (
                <button onClick={() => setFilters(new TransactionFilter())}>
                  <Icon iconKey="close" />
                </button>
              )}
              <Select
                value={filters.transType}
                data={transTypesMap}
                defaultSelected="Tipo"
                onChange={(e) => handleUpdateFilter(e, "transType")}
              />

              <Select
                value={filters.transPeriod}
                data={transPeriodMap}
                defaultSelected="Período"
                onChange={(e) => handleUpdateFilter(e, "transPeriod")}
              />
            </div>
          </TransactionList>
        </div>
      )}
    </>
  );
}
