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
      <Title text="Extrato" />
      {data.map((item: any, index: any) => (
        <>
          {item.mes}
          {item.transferencias.map((t: any, idx: any) => (
            <Transaction dataT={t} key={idx} />
          ))}
        </>
      ))}
    </div>
  );
};
