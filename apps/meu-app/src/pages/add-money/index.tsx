"use client";
import { v4 as generateUUID } from "uuid";
import styles from "./styles.module.scss";

import { useState } from "react";
import {
  IDeposito,
  TransacationTypes,
} from "../../utils/interfaces/transaction";
import { InputText } from "@components/input-text/input-text";
import { BtnClasses, Button } from "@components/button/button";
import { FormatDate } from "../../utils/functions/format-date";
import { UseDeposit } from "../../utils/hooks/useDeposit";

export default function AddMoney() {
  const { createDeposit } = UseDeposit();

  const [depositoBody, setDepositoBody] = useState<IDeposito>({
    valor: "",
    tipo: TransacationTypes.DEPOSITO,
    id: generateUUID(),
    data: "",
  });

  const updateBody = (value: number) => {
    if (!isNaN(value) && value > 0) {
      let dateToday = new Date();

      setDepositoBody({
        ...depositoBody,
        valor: value,
        data: FormatDate(dateToday),
      });
    }
    // add toast notification for error
  };

  const handleAddMoney = () => {
    createDeposit(depositoBody);
  };

  return (
    <div className={styles.transaction_layout}>
      <h2>Realizar Depósito</h2>

      <div className={styles.row}>
        <InputText
          value={depositoBody.valor}
          onChange={(e) => updateBody(Number(e.target.value))}
          id="valor"
          label="Valor"
          placeHolder="Valor"
          type="number"
        />
      </div>

      <div className={styles.end_row}>
        <Button
          btnClass={BtnClasses.CONFIRM}
          text="Confirmar"
          click={handleAddMoney}
        />
      </div>
    </div>
  );
}
