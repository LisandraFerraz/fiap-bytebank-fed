import styles from "./form.module.scss";
import { IDeposito } from "../../../utils/interfaces/transaction";
import { InputText } from "@components/input-text/input-text";
import { BtnClasses, Button } from "@components/button/button";
import { useState } from "react";
import { UseDeposit } from "../../../utils/hooks/useDeposit";

export const DepositForm = ({ data }: { data: any }) => {
  const { deleteDeposit, updateDeposit } = UseDeposit();

  const [newValor, setNewValor] = useState<number>(data?.valor);

  const handleChangeValues = (value: string | number) => {
    const parsed = Number(value);

    if (!isNaN(parsed) && parsed > 0) {
      setNewValor(parsed);
    }
  };

  const handleDeleteData = () => {
    deleteDeposit(data?.id);
  };

  const handleUpdateLoan = () => {
    let body = {
      ...data,
      valor: newValor,
    };
    updateDeposit(body);
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
              label="Valor do depósito"
              placeHolder="Valor do depósito"
              value={newValor}
              onChange={(e) => handleChangeValues(e.target.value)}
              type="number"
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
          />
        </div>
      </div>
    </>
  );
};
