"use client";
import { v4 as generateUUID } from "uuid";
import styles from "./../../styles/page-form.module.scss";

import style from "./styles.module.scss";
import { useEffect, useState } from "react";
import {
  IDeposito,
  TransacationTypes,
} from "../../utils/interfaces/transaction";
import { InputText } from "@components/input-text/input-text";
import { BtnClasses, Button } from "@components/button/button";
import { FormatDate } from "../../utils/functions/format-date";
import { UseDeposit } from "../../utils/hooks/useDeposit";
import { UseAccount } from "../../utils/hooks/useAccount";
import { Transaction } from "@components/transaction/transaction";

export default function AddMoney() {
  const { createDeposit } = UseDeposit();
  const { getAccountDetails } = UseAccount();

  const [depositList, setDepositList] = useState<IDeposito[]>([]);
  const [depositoBody, setDepositoBody] = useState<IDeposito>({
    valor: 0,
    tipo: TransacationTypes.DEPOSITO,
    id: generateUUID(),
    data: "",
  });

  useEffect(() => {
    listDepositos();
  }, []);

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

  const listDepositos = async () => {
    const accountData = await getAccountDetails();
    const depositList = accountData.transHistory.depositos;
    setDepositList(depositList);
  };

  return (
    <>
      <div className={styles.transaction_form}>
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
      {depositList && (
        <div className={style.transacions_list}>
          {depositList.map((dp: IDeposito, index) => (
            <div key={index} className={styles.list_items}>
              <Transaction dataT={dp} key={index} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
