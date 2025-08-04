import styles from "./form.module.scss";
import { UseLoans } from "../../../utils/hooks/useLoans";
import { useState } from "react";
import { IEmprestimo } from "../../../utils/interfaces/transaction";
import { Button, InputText } from "@bytebank/ui";
import { BtnClasses } from "../../../utils/types";
import { isAmountInvalid } from "../../../utils/functions/form-validate/valor-validate";
import { currencyBlocks } from "@bytebank/utils";
import { useToast } from "../../../utils/hooks/context-hooks/useToast";
import { errorResponse } from "../../../utils/functions/api-res-treatment";
import { useLoader } from "../../../utils/hooks/context-hooks/useLoader";

export const EmprestimoForm = ({
  data,
  closeModal,
}: {
  data: any;
  closeModal: () => void;
}) => {
  const { deleteLoan, updateLoan } = UseLoans();
  const { showToast } = useToast();
  const { showLoader, hideLoader } = useLoader();

  const [updatedLoan, setUpdatedLoan] = useState<any>({
    valor: 0,
    valorPago: 0,
  });

  const handleChangeValues = (key: keyof IEmprestimo, e: any) => {
    setUpdatedLoan({
      ...updatedLoan,
      [key]: Number(e),
    });
  };

  const handleDeleteData = () => {
    showLoader();
    deleteLoan(data?.transId).then((res: any) => {
      hideLoader();
      if (errorResponse(res)) return showToast("error", res?.message);
      closeModal();
    });
  };

  const handlepayLoan = () => {
    showLoader();
    delete data.valorDevido;
    delete data.aberto;

    let body = {
      ...data,
      ...updatedLoan,
    };

    updateLoan(body).then((res: any) => {
      hideLoader();
      if (errorResponse(res)) return showToast("error", res?.message);
      closeModal();
    });
  };

  return (
    <>
      <div className={styles.transaction_form}>
        <div className={styles.payment_info}>
          <p className={styles.original_legenda}>
            Valor original: <b>R$ {data?.valor}</b>
          </p>
          <p className={styles.original_legenda}>
            Total já pago: <b>R$ {data?.valorPago}</b>
          </p>
        </div>
        <div className={styles.row}>
          <InputText
            id="valorEmprestimo"
            label="Valor do empréstimo"
            onChange={(e) => handleChangeValues("valor", e.target.value)}
            mask="R$ currency"
            blocks={currencyBlocks}
            placeHolder="R$ 0.000"
            type="text"
            errorMsg={
              updatedLoan.valor && isAmountInvalid(updatedLoan.valor)
                ? "- inválido"
                : ""
            }
          />
          <InputText
            id="valorPago"
            label="Valor pago"
            onChange={(e) => handleChangeValues("valorPago", e.target.value)}
            type="text"
            blocks={currencyBlocks}
            mask="R$ currency"
            placeHolder="R$ 0.000"
            errorMsg={
              updatedLoan.valorPago && isAmountInvalid(updatedLoan.valorPago)
                ? "- inválido"
                : ""
            }
          />
        </div>
        <div className={styles.end_row}>
          <Button
            btnClass={BtnClasses.DELETE}
            text="Excluir"
            click={handleDeleteData}
          />
          <Button
            btnClass={BtnClasses.CONFIRM}
            text="Salvar Alterações"
            click={handlepayLoan}
            disabled={
              isAmountInvalid(updatedLoan.valor) &&
              isAmountInvalid(updatedLoan.valorPago)
            }
          />
        </div>
      </div>
    </>
  );
};
