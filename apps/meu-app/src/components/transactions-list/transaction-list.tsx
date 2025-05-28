"use client";

import styles from "./transaction-list.module.scss";

import { Title } from "@components/title-text/title-text";
import { useEffect, useState } from "react";
import { Transaction } from "@components/transaction/transaction";
import { transactionsList } from "../../utils/transactions";
import { ITransacao } from "../../utils/interfaces/transaction";

interface ITransactions {
  data: any;
}

export const TransactionList = ({ data }: ITransactions) => {
  return (
    <div className={styles.transacions_list}>
      {data.length ? (
        <>
          <Title text="Extrato" />
          {data.map((item: any, index: any) => (
            <div key={index}>
              {item.mes}
              {item.transferencias.map((t: any, idx: any) => (
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
