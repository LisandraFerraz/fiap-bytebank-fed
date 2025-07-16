"use client";
import styles from "./transaction-list.module.scss";

import { Title } from "@components/title-text/title-text";
import { Transaction } from "@components/transaction/transaction";
import { useEffect, useState } from "react";

//  TO-DO CRIAR INTERFACE TRANSHISTORY
export const TransactionList = ({ data }: { data: any }) => {
  const [transactions, setTransactions] = useState<any>();

  useEffect(() => {
    setTransactions([data]);
  }, [data]);

  return (
    <div className={styles.transacions_list}>
      {transactions?.length ? (
        <>
          <Title text="Extrato" />
          {transactions?.map((item: any, index: any) => (
            <div key={index} className={styles.list_items}>
              {item.mes}
              {item.transferencias.map((t: any, idx: any) => (
                <Transaction dataT={t} key={idx} />
              ))}
              {item.depositos.map((t: any, idx: any) => (
                <Transaction dataT={t} key={idx} />
              ))}
              {item.historicoEmprestimos.map((t: any, idx: any) => (
                <Transaction dataT={t} key={idx} />
              ))}
            </div>
          ))}
        </>
      ) : (
        <div className={styles.no_data}>
          <Title text="Seu extrato está vazio." />
          <p>Faça alguma transfência para visualizar aqui.</p>
        </div>
      )}
    </div>
  );
};
