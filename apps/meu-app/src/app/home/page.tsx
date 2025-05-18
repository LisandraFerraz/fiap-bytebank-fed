"use client";
import { Sidenav } from "@components/sidenav/sidenav";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { useEffect } from "react";
import { UseUser } from "../../utils/hooks/useUser";
import { UseTransactions } from "../../utils/hooks/useTransactions";
import { ITransferencia } from "../../utils/interfaces/transaction";

export default function Home() {
  const { getUserInfo } = UseUser();
  const { sendMoney, addMoney } = UseTransactions();

  useEffect(() => {
    const getData = async () => {
      const resBff = await getUserInfo("12345678901");
      console.log(resBff);
    };

    const sendMoneyTest = () => {
      const data: ITransferencia = {
        valor: 2000,
        data: "20/12/2025",
        descricao: "Testando transferencia novamente",
      };

      sendMoney("12345678901", "789123", data);
    };

    const addMoneyTest = () => {
      const data: ITransferencia = {
        valor: 1000,
        data: "20/01/2025",
        descricao: "Adicionando dinheiro na propria conta",
      };
      addMoney("789123", data); // TODO: alterar para conta ativa
    };

    addMoneyTest();
    // sendMoneyTest();
    // getData();
  }, []);

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
