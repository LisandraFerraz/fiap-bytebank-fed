"use client";
import { v4 as generateUUID, v7 } from "uuid";

import { LoanList } from "@components/loan-list/loan-list";
import form_styles from "./../../styles/page-form.module.scss";
import {
  IEmprestimo,
  TransacationTypes,
} from "../../utils/interfaces/transaction";
import { endpoints } from "../../environment/endpoints";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { InputText } from "@components/input-text/input-text";
import { BtnClasses, Button } from "@components/button/button";
import { FormatDate } from "../../utils/functions/format-date";
import { UseLoans } from "../../utils/hooks/useLoans";
import { TabsList } from "@components/tabs-list/tabs-list";
import { useUserContext } from "../../context/user-context";

export default function Loan() {
  const { user } = useUserContext();

  const { requestLoan, orderLoan } = UseLoans();

  const [valor, setValor] = useState<number>(0);
  const [loanPending, setLoanPending] = useState<IEmprestimo[]>([]);
  const [paidLoan, setPaidLoan] = useState<IEmprestimo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.cpf) {
      orderLoan(user?.cpf).then((res) => {
        const { loanPending, paidLoan } = res;

        setLoanPending(loanPending);
        setPaidLoan(paidLoan);

        setIsLoading(false);
      });
    }
  }, [user?.cpf]);

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
      {!isLoading && (
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
      )}
    </>
  );
}
