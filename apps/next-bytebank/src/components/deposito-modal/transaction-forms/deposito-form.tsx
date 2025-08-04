import styles from "./form.module.scss";
import { useState } from "react";
import { UseDeposit } from "../../../utils/hooks/useDeposit";
import { Button, InputText } from "@bytebank/ui";
import { BtnClasses } from "../../../utils/types";
import { errorResponse } from "../../../utils/functions/api-res-treatment";
import { useToast } from "../../../utils/hooks/context-hooks/useToast";
import { currencyBlocks } from "@bytebank/utils";
import { isAmountInvalid } from "../../../utils/functions/form-validate/valor-validate";
import { useLoader } from "../../../utils/hooks/context-hooks/useLoader";

export const DepositForm = ({
  data,
  closeModal,
}: {
  data: any;
  closeModal: () => void;
}) => {
  const { deleteDeposit, updateDeposit } = UseDeposit();
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();

  const [newValor, setNewValor] = useState<number>(0);

  const handleChangeValues = (value: number) => {
    setNewValor(value);
  };

  const handleDeleteData = () => {
    showLoader();
    deleteDeposit(data?.transId).then((res: any) => {
      hideLoader();
      if (errorResponse(res)) return showToast("error", res?.message);
      closeModal();
    });
  };

  const handleUpdateLoan = () => {
    showLoader();
    let body = {
      ...data,
      valor: newValor,
    };
    updateDeposit(body).then((res: any) => {
      closeModal();
      if (errorResponse(res)) return showToast("error", res?.message);
      closeModal();
    });
  };

  return (
    <>
      <div className={styles.transaction_form}>
        <div className={styles.payment_info}>
          <p className={styles.pending_payment}>
            Valor original: <b>R$ {data?.valor}</b>
          </p>
        </div>
        <div className={styles.row}>
          <div>
            <InputText
              id="valorDeposito"
              onChange={(e) => handleChangeValues(Number(e.target.value))}
              label="valor"
              mask="R$ currency"
              placeHolder="R$ 0.000"
              blocks={currencyBlocks}
              type="text"
              errorMsg={
                newValor && isAmountInvalid(newValor) ? "- inválido" : ""
              }
            />
          </div>
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
            click={handleUpdateLoan}
            disabled={isAmountInvalid(newValor)}
          />
        </div>
      </div>
    </>
  );
};
