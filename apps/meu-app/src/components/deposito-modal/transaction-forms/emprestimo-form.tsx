import styles from "./form.module.scss";
import { BtnClasses, Button } from "@components/button/button";
import { UseLoans } from "../../../utils/hooks/useLoans";
import { useState } from "react";
import { IEmprestimo } from "../../../utils/interfaces/transaction";
import { InputText } from "@components/input-text/input-text";

export const EmprestimoForm = ({ data }: { data: any }) => {
  const { deleteLoan, updateLoan } = UseLoans();

  const [updatedLoan, setUpdatedLoan] = useState<any>({
    valorPago: data.valorPago,
    valor: data.valor,
  });

  const handleChangeValues = (key: keyof IEmprestimo, e: any) => {
    let parsed = Number(e);
    if (parsed >= 1) {
      setUpdatedLoan({
        ...updatedLoan,
        [key]: Number(e),
      });
    }
  };

  const handleDeleteData = () => {
    deleteLoan(data.id);
  };

  const handleUpdateLoan = () => {
    delete data.valor;

    updateLoan({
      ...data,
      ...updatedLoan,
      valorDevido: updatedLoan.valor - updatedLoan.valorPago,
    });
  };

  return (
    <>
      <div className={styles.transaction_form}>
        <div className={styles.payment_info}>
          <p className={styles.pending_payment}>
            Valor a pagar: <b>R$ {updatedLoan.valor - updatedLoan.valorPago}</b>
          </p>
          <p className={styles.original_legenda}>
            Valor original: <b>R$ {data.valor}</b>
          </p>
          <p className={styles.original_legenda}>
            Total já pago: <b>R$ {data.valorPago}</b>
          </p>
        </div>
        <div className={styles.row}>
          <div>
            <InputText
              id="valorEmprestimo"
              label="Valor do empréstimo"
              placeHolder="Valor do empréstimo"
              value={updatedLoan.valor}
              onChange={(e) => handleChangeValues("valor", e.target.value)}
              type="number"
            />
            <p className={styles.original_legenda}>
              Valor original: R$ {data.valor}
            </p>
          </div>
          <div>
            <InputText
              id="valorPago"
              label="Valor pago"
              placeHolder="Valor pago"
              value={updatedLoan.valorPago}
              onChange={(e) => handleChangeValues("valorPago", e.target.value)}
              type="number"
            />
            <p className={styles.original_legenda}>
              Valor original: R$ {data.valorPago}
            </p>
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
