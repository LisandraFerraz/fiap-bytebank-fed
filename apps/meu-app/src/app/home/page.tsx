"use client";
import { Sidenav } from "@components/sidenav/sidenav";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { useEffect } from "react";
import { UseUser } from "../../utils/hooks/useUser";
import { UseTransactions } from "../../utils/hooks/useTransactions";
import { IPayLoan, IPix, ITed } from "../../utils/interfaces/transaction";

export default function Home() {
  const { getUserInfo } = UseUser();
  const { sendPix, sendBankDeposit, addMoney, applyLoan, payLoan } =
    UseTransactions();

  const dateNow = new Date();

  useEffect(() => {
    const getData = async () => {
      const resBff = await getUserInfo("12345678901");
      console.log(resBff);
    };

    const sendMoneyTest = () => {
      const data: ITed = {
        valor: 2000,
        data: String(dateNow),
        descricao: "Testando transferencia novamente",
      };

      sendBankDeposit("12345678901", "789123", data);
    };

    const addMoneyTest = () => {
      const data: ITed = {
        valor: 1000,
        data: String(dateNow),
        descricao: "Adicionando dinheiro na propria conta",
      };
      addMoney("789123", data); // TODO: alterar para conta ativa
    };

    const applyLoanTest = () => {
      applyLoan("12345678901", 2000);
    };

    const payLoanTest = () => {
      let body: IPayLoan = {
        valorPago: 500,
        data: dateNow,
      };
      payLoan("12345678901", "a51faca8-af3f-4bdf-aa8f-d7844ce6d0c6", body);
    };

    const sendPixTest = () => {
      const body: IPix = {
        valor: 100,
        data: String(dateNow),
        descricao: "Testando pix",
        chavePix: "bruno.ferreira@pix.com",
      };

      sendPix("12345678901", body);
    };

    sendPixTest();
    // payLoanTest();
    // applyLoanTest();
    // addMoneyTest();
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
