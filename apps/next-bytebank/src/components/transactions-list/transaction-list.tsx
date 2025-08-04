"use client";
import styles from "./transaction-list.module.scss";

import { Title } from "@components/title-text/title-text";
import { Transaction } from "@components/transaction/transaction";
import { useEffect, useState } from "react";

export const TransactionList = ({
  data,
  children,
  updateData,
}: {
  data: any[];
  children: React.ReactNode;
  updateData: any;
}) => {
  const [transactions, setTransactions] = useState<any[]>(data);

  useEffect(() => {
    setTransactions(data);
  }, [data]);

  return (
    <div className={styles.transacions_list}>
      {transactions?.length ? (
        <>
          <Title text="Movimentações bancárias" size="base" />
          {children}
          {transactions?.map((item: any, index: any) => (
            <div key={index} className={styles.list_items}>
              <Transaction refresh={updateData} dataT={item} key={index} />
            </div>
          ))}
        </>
      ) : (
        <div className={styles.no_data}>
          <Title text="Seu extrato está vazio." size="md" />
          <p>Faça alguma transfência para visualizar aqui.</p>
        </div>
      )}
    </div>
  );
};
