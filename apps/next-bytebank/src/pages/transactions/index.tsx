"use client";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { Shortcuts } from "@components/shortcuts/shortcuts";
import { useEffect, useState } from "react";
import { UseAccount } from "../../utils/hooks/useAccount";
import { UserDataStore } from "../../stores/user-data-store";
import { IUsuario } from "../../utils/interfaces/user";
import { IConta, ITransacoes } from "../../utils/interfaces/conta";
import { TransactionFilter } from "../../utils/interfaces/transaction";
import { Select } from "@components/inputs/input-select/input-select";
import { transPeriodMap, transTypesMap } from "./utils/transaction-maps";
import { Icon } from "@components/icon/icon";
import { Paginator } from "@components/paginator/paginator";
import { Pagination } from "../../utils/interfaces/pagination";

export default function TransactionsLayout() {
  const { getAccountDetails } = UseAccount();

  const { user } = UserDataStore((state) => state.data);

  const [accountDetails, setAccountDetails] = useState<IUsuario>();
  const [trasactionList, setTransactionList] = useState<ITransacoes[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>(new Pagination());

  const [filters, setFilters] = useState<TransactionFilter>(
    new TransactionFilter()
  );

  useEffect(() => {
    listTransactions(1);
  }, [user?.cpf, filters]);

  const listTransactions = (page: number) => {
    if (user?.cpf) {
      getAccountDetails(filters, pagination).then((data: any) => {
        const { accountDetails, transacoes } = data;

        setAccountDetails(accountDetails);
        setTransactionList(transacoes.transactions);
        setPagination({ ...pagination, currentPage: page });

        setIsLoading(false);
      });
    }
  };

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
          {trasactionList && (
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
          )}
          <Paginator
            currentPage={pagination?.currentPage}
            itemsPage={pagination?.itemsPage}
            totalItems={pagination?.totalItems}
            nextPage={(page) => listTransactions(page)}
          />
        </div>
      )}
    </>
  );
}
