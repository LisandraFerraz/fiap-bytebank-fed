"use client";
import { v4 as generateUUID } from "uuid";

import { LoanList } from "@components/loan-list/loan-list";
import form_styles from "./../../styles/page-form.module.scss";
import {
  IEmprestimo,
  TransacationTypes,
} from "../../utils/interfaces/transaction";
import { endpoints } from "../../environment/endpoints";
import { GetStaticProps } from "next";
import { useState } from "react";
import { env } from "../api/_environment/environment";
import { InputText } from "@components/input-text/input-text";
import { BtnClasses, Button } from "@components/button/button";
import { FormatDate } from "../../utils/functions/format-date";
import { UseLoans } from "../../utils/hooks/useLoans";
import { TabsList } from "@components/tabs-list/tabs-list";

interface IPendingLoan {
  paidLoan: IEmprestimo[];
  loanPending: IEmprestimo[];
}

export default function Loan({ paidLoan, loanPending }: IPendingLoan) {
  const { requestLoan } = UseLoans();

  const [valor, setValor] = useState<number>(0);
  const tabsContent = [
    {
      title: "A pagar",
      component: <LoanList data={loanPending} />,
    },
    {
      title: "Histórico",
      component: <LoanList data={paidLoan} />,
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
        data: FormatDate(dateToday),
        valorPago: 0,
        valorDevido: 0,
      };
      requestLoan(loanBody);
    }
  };

  return (
    <>
      <div className={form_styles.transaction_form}>
        <h2>Empréstimos</h2>
        <div className={form_styles.row}>
          <InputText
            value={valor}
            id="valor"
            onChange={(e) => setValor(e.target.value)}
            label="valor"
            placeHolder="Valor"
            type="number"
          />
        </div>
        <div className={form_styles.end_row}>
          <Button
            click={handleRequestLoan}
            btnClass={BtnClasses.CONFIRM}
            text="Confirmar"
          />
        </div>
      </div>
      <TabsList data={tabsContent} />
    </>
  );
}

export const getStaticProps: GetStaticProps<IPendingLoan> = async () => {
  try {
    const { historyRes, loanRes } = {
      historyRes: await fetch(
        `${env.bffUrl}${endpoints.loan}?cpf=${"12345678901"}`,
        {
          method: "GET",
        }
      ),
      loanRes: await fetch(
        `${env.bffUrl}${endpoints.loan}?cpf=${"12345678901"}&aberto=${true}`,
        {
          method: "GET",
        }
      ),
    };

    const { paidLoan, openLoan } = {
      paidLoan: await historyRes.json(),
      openLoan: await loanRes.json(),
    };

    return {
      props: {
        paidLoan: paidLoan.paidLoan,
        loanPending: openLoan.pendingLoan,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        paidLoan: [],
        loanPending: [],
      },
    };
  }
};
