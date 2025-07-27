import styles from "./loan-modal.module.scss";
import { ModalLayout } from "@components/modal-layout/modal-layout";
import { IEmprestimo } from "../../utils/interfaces/transaction";
import { Button, InputText } from "@bytebank/ui";
import { useState } from "react";
import { UseLoans } from "../../utils/hooks/useLoans";
import { BtnClasses } from "../../utils/types";

export const LoanModal = ({
  data,
  onClose,
}: {
  data: IEmprestimo;
  onClose: () => void;
}) => {
  const { payLoan } = UseLoans();

  const [payLoanBody, setPayLoanBody] = useState<IEmprestimo>({
    ...data,
  });

  const handleSetBody = (valor: string) => {
    const valorParsed = Number(valor);

    if (!isNaN(valorParsed) && valorParsed > 0) {
      setPayLoanBody({
        ...data,
        valorPago: valorParsed,
      });
    }
  };

  const handlePayLoan = () => {
    payLoan(payLoanBody);
  };

  return (
    <>
      <ModalLayout onClose={onClose} modalTitle="Registrar pagamento">
        <p className={styles.loan_amount}>
          Valor do empréstimo: R$ {data?.valorDevido}
        </p>
        <div className={styles.form_layout}>
          <div className={styles.row}>
            <InputText
              value={payLoanBody.valorPago}
              id="valor"
              label="Valor a pagar"
              placeHolder="Valor a pagar"
              onChange={(e) => handleSetBody(e.target.value)}
              type="number"
            />
          </div>
          <div className={styles.form_bottom}>
            <Button
              text="Confirmar"
              click={handlePayLoan}
              btnClass={BtnClasses.CONFIRM}
            />
          </div>
        </div>
      </ModalLayout>
    </>
  );
};
