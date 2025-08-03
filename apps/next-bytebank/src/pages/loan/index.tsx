"use client";

import { LoanList } from "@components/loan-list/loan-list";
import form_styles from "./../../styles/page-form.module.scss";
import {
  IEmprestimo,
  TransacationTypes,
} from "../../utils/interfaces/transaction";
import { useEffect, useState } from "react";
import { Button, InputText } from "@bytebank/ui";
import { FormatDate } from "../../utils/functions/format-date";
import { UseLoans } from "../../utils/hooks/useLoans";
import { TabsList } from "@components/tabs-list/tabs-list";
import { UserDataStore } from "../../stores/user-data-store";
import { BtnClasses } from "../../utils/types";
import { currencyBlocks, isValueEmpty } from "@bytebank/utils";
import { useLoader } from "../../utils/hooks/context-hooks/useLoader";
import { isAmountInvalid } from "../../utils/functions/form-validate/valor-validate";
import { errorResponse } from "../../utils/functions/api-res-treatment";
import { useToast } from "../../utils/hooks/context-hooks/useToast";
import { v4 as generateUID } from "uuid";

export default function Loan() {
  const { user } = UserDataStore((state) => state.data);
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();

  const { requestLoan, getOrderedLoan } = UseLoans();

  const [valor, setValor] = useState<number>(0);
  const [loanPending, setLoanPending] = useState<IEmprestimo[]>([]);
  const [paidLoan, setPaidLoan] = useState<IEmprestimo[]>([]);

  useEffect(() => {
    handleListOrderedLoans();
  }, [user?.cpf]);

  const handleListOrderedLoans = () => {
    if (user?.cpf) {
      showLoader();
      getOrderedLoan(user?.cpf).then((res) => {
        const { loanPending, paidLoan } = res;

        setLoanPending(loanPending);
        setPaidLoan(paidLoan);

        hideLoader();
      });
    }
  };

  const handleRequestLoan = () => {
    const valorParsed = Number(valor);
    const dateToday = new Date();

    showLoader();
    if (!isNaN(valorParsed) && valorParsed > 0) {
      const loanBody: IEmprestimo = {
        tipo: TransacationTypes.EMPRESTIMO,
        valor: valorParsed,
        data: FormatDate(dateToday),
        valorPago: 0,
        valorDevido: 0,
        id: generateUID(),
      };
      requestLoan(loanBody).then((res: any) => {
        if (errorResponse(res)) return showToast("error", res?.message);

        handleListOrderedLoans();
      });
      hideLoader();
    }
  };

  const tabsContent = [
    {
      title: "A pagar",
      component: loanPending && (
        <LoanList data={loanPending} updateDate={handleListOrderedLoans} />
      ),
    },
    {
      title: "Histórico",
      component: paidLoan && (
        <LoanList data={paidLoan} updateDate={handleListOrderedLoans} />
      ),
    },
  ];

  return (
    <>
      <div className={form_styles.transaction_form}>
        <h2>Empréstimos</h2>
        <form action={handleRequestLoan}>
          <div className={form_styles.row}>
            <InputText
              id="valor"
              onChange={(e) => setValor(e.target.value)}
              label="valor"
              mask="R$ currency"
              blocks={currencyBlocks}
              placeHolder="R$ 0.000"
              type="text"
              errorMsg={valor && isAmountInvalid(valor) ? "- inválido" : ""}
            />
          </div>
          <div className={form_styles.end_row}>
            <Button
              disabled={isAmountInvalid(valor)}
              type="submit"
              btnClass={BtnClasses.CONFIRM}
              text="Confirmar"
            />
          </div>
        </form>
      </div>
      {loanPending.length || paidLoan.length ? (
        <TabsList data={tabsContent} />
      ) : (
        <>
          <h3>Sem registros.</h3>
        </>
      )}
    </>
  );
}
