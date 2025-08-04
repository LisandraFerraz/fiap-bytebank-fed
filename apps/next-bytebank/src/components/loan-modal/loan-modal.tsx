import styles from "./loan-modal.module.scss";
import { ModalLayout } from "@components/modal-layout/modal-layout";
import { IEmprestimo } from "../../utils/interfaces/transaction";
import { Button, InputText } from "@bytebank/ui";
import { useState } from "react";
import { UseLoans } from "../../utils/hooks/useLoans";
import { BtnClasses } from "../../utils/types";
import { useLoader } from "../../utils/hooks/context-hooks/useLoader";
import { errorResponse } from "../../utils/functions/api-res-treatment";
import { useToast } from "../../utils/hooks/context-hooks/useToast";
import { isAmountInvalid } from "../../utils/functions/form-validate/valor-validate";
import { currencyBlocks } from "@bytebank/utils";

export const LoanModal = ({
  data,
  onClose,
}: {
  data: IEmprestimo;
  onClose: () => void;
}) => {
  const { payLoan } = UseLoans();
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();

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
    showLoader();
    payLoan(payLoanBody).then((res: any) => {
      hideLoader();
      if (errorResponse(res)) return showToast("error", res?.message);
      onClose();
    });
  };

  return (
    <>
      <ModalLayout onClose={onClose} modalTitle="Registrar pagamento">
        <p className={styles.loan_amount}></p>
        <form action={handlePayLoan} className={styles.form_layout}>
          <div className={styles.row}>
            <InputText
              id="valor"
              label="Valor a pagar"
              onChange={(e) => handleSetBody(e.target.value)}
              mask="R$ currency"
              blocks={currencyBlocks}
              placeHolder="R$ 0.000"
              type="text"
              errorMsg={
                payLoanBody.valor && isAmountInvalid(payLoanBody.valor)
                  ? "- inválido"
                  : ""
              }
            />
          </div>
          <div className={styles.form_bottom}>
            <Button
              text="Confirmar"
              type="submit"
              btnClass={BtnClasses.CONFIRM}
              disabled={isAmountInvalid(payLoanBody.valor)}
            />
          </div>
        </form>
      </ModalLayout>
    </>
  );
};
