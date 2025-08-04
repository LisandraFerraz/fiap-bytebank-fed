"use client";
import styles from "./styles.module.scss";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { Shortcuts } from "@components/shortcuts/shortcuts";
import { useEffect, useState } from "react";
import { UseAccount } from "../../utils/hooks/useAccount";
import { UserDataStore } from "../../stores/user-data-store";
import { IUsuario } from "../../utils/interfaces/user";
import { ITransacoes } from "../../utils/interfaces/conta";
import { TransactionFilter } from "../../utils/interfaces/transaction";
import { Paginator } from "@components/paginator/paginator";
import { Pagination } from "../../utils/interfaces/pagination";
import { Icon, Select, Title } from "@bytebank/ui";
import { ExpansesChart } from "@components/charts/expanses/expanses-chart";
import { Balance } from "@components/balance/balance";
import {
  transTypesMap,
  transPeriodMaps,
} from "../../utils/functions/transaction-maps";
import { useLoader } from "../../utils/hooks/context-hooks/useLoader";

export default function Dashboard() {
  const { getAccountDetails } = UseAccount();
  const { showLoader, hideLoader } = useLoader();

  const { user, account } = UserDataStore((state) => state.data);

  const [accountDetails, setAccountDetails] = useState<IUsuario>();
  const [trasactionList, setTransactionList] = useState<ITransacoes[]>();
  const [pagination, setPagination] = useState<Pagination>(new Pagination());

  const [filters, setFilters] = useState<TransactionFilter>({});

  useEffect(() => {
    showLoader();
    listTransactions(1);
  }, [user?.cpf, filters]);

  const listTransactions = (page: number) => {
    if (user?.cpf) {
      getAccountDetails(filters, { ...pagination, currentPage: page }).then(
        (data: any) => {
          const { accountDetails, transacoes } = data;

          setAccountDetails(accountDetails);
          setTransactionList(transacoes.transactions);
          setPagination(transacoes.paginacao);
          hideLoader();
        }
      );
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
      {account ? (
        <div className={styles.content}>
          <div className={styles.dashboard_widgets}>
            <Balance amount={account?.saldo} />
            <ExpansesChart />
          </div>

          <Shortcuts />
          {trasactionList && (
            <TransactionList
              updateData={() => listTransactions(pagination.currentPage)}
              data={trasactionList}
            >
              <div className={styles.filter_group}>
                {(filters.transPeriod || filters.transType) && (
                  <button onClick={() => setFilters({})}>
                    <Icon iconKey="close" />
                  </button>
                )}
                <Select
                  data={transTypesMap}
                  defaultSelected="Tipo"
                  onChange={(e) => handleUpdateFilter(e, "transType")}
                />

                <Select
                  data={transPeriodMaps}
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
      ) : (
        <div className={styles.no_data}>
          <Title text="Seu extrato está vazio." size="md" />
          <p>Faça alguma transfência para visualizar aqui.</p>
        </div>
      )}
    </>
  );
}
