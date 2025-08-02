"use client";
import styles from "./../../styles/page-form.module.scss";

import { useEffect, useState } from "react";
import {
  IDeposito,
  TransacationTypes,
} from "../../utils/interfaces/transaction";
import { Button, InputText } from "@bytebank/ui";
import { FormatDate } from "../../utils/functions/format-date";
import { UseDeposit } from "../../utils/hooks/useDeposit";
import { UseAccount } from "../../utils/hooks/useAccount";
import { BtnClasses } from "../../utils/types";
import { isValueEmpty } from "@bytebank/utils";
import { Pagination } from "../../utils/interfaces/pagination";
import { Transaction } from "@components/transaction/transaction";
import { Paginator } from "@components/paginator/paginator";

export default function AddMoney() {
  const { createDeposit } = UseDeposit();
  const { getAccountDetails } = UseAccount();

  const [depositList, setDepositList] = useState<IDeposito[]>([]);
  const [depositoBody, setDepositoBody] = useState<IDeposito>({
    valor: 0,
    tipo: TransacationTypes.DEPOSITO,
    data: "",
  });
  const [pagination, setPagination] = useState<Pagination>(new Pagination());

  useEffect(() => {
    listDepositos(1);
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
  };

  const handleAddMoney = () => {
    createDeposit(depositoBody);
  };

  const listDepositos = async (page: number) => {
    const data = await getAccountDetails(
      {
        transType: TransacationTypes.DEPOSITO,
        transPeriod: "",
      },
      { ...pagination, currentPage: page }
    );

    const { transacoes } = data;
    setDepositList(transacoes.transactions);
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
            disabled={isValueEmpty(depositoBody.valor)}
            btnClass={BtnClasses.CONFIRM}
            text="Confirmar"
            click={handleAddMoney}
          />
        </div>
      </div>
      {depositList && (
        <div className={styles.transacions_list}>
          {depositList.map((dp: IDeposito, index) => (
            <div key={index} className={styles.list_items}>
              <Transaction dataT={dp} key={index} />
            </div>
          ))}
          <Paginator
            currentPage={pagination.currentPage}
            itemsPage={pagination.itemsPage}
            totalItems={pagination.itemsPage}
            nextPage={(page) => listDepositos(page)}
          />
        </div>
      )}
    </>
  );
}
