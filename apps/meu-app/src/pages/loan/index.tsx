"use client";

import { v4 as generateUUID } from "uuid";

import { LoanPendingList } from "@components/loan-list/loan-list";
import styles from "./styles.module.scss";
import {
  IEmprestimo,
  TransacationTypes,
} from "../../utils/interfaces/transaction";
import { endpoints } from "../../environment/endpoints";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { env } from "../api/_environment/environment";
import { InputText } from "@components/input-text/input-text";
import { UseTransactions } from "../../utils/hooks/useTransactions";
import { BtnClasses, Button } from "@components/button/button";

interface IPendingLoan {
  loanHistory: IEmprestimo[];
  loanPending: IEmprestimo[];
}

export default function Loan({ loanHistory, loanPending }: IPendingLoan) {
  const { requestLoan } = UseTransactions();

  const [valor, setValor] = useState<number>(0);
  const tabsContent = [
    {
      title: "A pagar",
      component: <LoanPendingList data={loanPending} />,
    },
    {
      title: "Histórico",
      component: <LoanPendingList data={loanPending} />,
    },
  ];

  const handleRequestLoan = () => {
    const valorParsed = Number(valor);
    const dateToday = new Date();

    if (!isNaN(valorParsed) && valorParsed > 0) {
      const loanBody: IEmprestimo = {
        tipo: TransacationTypes.EMPRESTIMO,
        id: generateUUID(),
        valor: valorParsed,
        data: String(dateToday),
        valorPago: 0,
      };
      requestLoan("12345678901", loanBody);
    }
  };

  return (
    <>
      <div className={styles.transaction_layout}>
        <h2>Empréstimos</h2>
        <div className={styles.row}>
          <InputText
            value={valor}
            id="valor"
            onChange={(e) => setValor(e.target.value)}
            label="valor"
            placeHolder="Valor"
            type="number"
          />
        </div>
        <div className={styles.row}>
          <Button
            click={handleRequestLoan}
            btnClass={BtnClasses.CONFIRM}
            text="Confirmar"
          />
        </div>
      </div>
      <LoanPendingList data={loanPending} />
      {/* Solicitar empréstimos */}
      {/* verificar empréstimos em aberto */}
      {/* historico de emprestimos\\ */}
    </>
  );
}

export const getStaticProps: GetStaticProps<IPendingLoan> = async () => {
  try {
    const { historyRes, loanRes } = {
      historyRes: await fetch(
        `${env.bffUrl}${endpoints.listLoans}?cpf=${"12345678901"}`,
        {
          method: "GET",
        }
      ),
      loanRes: await fetch(
        `${env.bffUrl}${
          endpoints.listLoans
        }?cpf=${"12345678901"}&aberto=${true}`,
        {
          method: "GET",
        }
      ),
    };

    const { loanHistory, openLoan } = {
      loanHistory: await historyRes.json(),
      openLoan: await loanRes.json(),
    };

    return {
      props: {
        loanHistory: loanHistory.data,
        loanPending: openLoan.pendingLoan,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        loanHistory: [],
        loanPending: [],
      },
    };
  }
};
