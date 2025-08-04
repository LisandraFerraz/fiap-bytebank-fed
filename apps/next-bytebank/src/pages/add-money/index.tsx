"use client";
import styles from "./../../styles/page-form.module.scss";

import { useEffect, useState } from "react";
import {
  IDeposito,
  TransacationTypes,
  TransPeriod,
} from "../../utils/interfaces/transaction";
import { Button, InputText, Title } from "@bytebank/ui";
import { FormatDate } from "../../utils/functions/format-date";
import { UseDeposit } from "../../utils/hooks/useDeposit";
import { UseAccount } from "../../utils/hooks/useAccount";
import { BtnClasses } from "../../utils/types";
import { currencyBlocks } from "@bytebank/utils";
import { Pagination } from "../../utils/interfaces/pagination";
import { Transaction } from "@components/transaction/transaction";
import { isAmountInvalid } from "../../utils/functions/form-validate/valor-validate";
import { useLoader } from "../../utils/hooks/context-hooks/useLoader";
import { useToast } from "../../utils/hooks/context-hooks/useToast";
import { errorResponse } from "../../utils/functions/api-res-treatment";
import { v4 as generateUID } from "uuid";

export default function AddMoney() {
  const { createDeposit } = UseDeposit();
  const { getAccountDetails } = UseAccount();

  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();

  const [depositList, setDepositList] = useState<IDeposito[]>([]);

  const [pagination, setPagination] = useState<Pagination>(new Pagination());
  const [valor, setValor] = useState<number>(0);

  useEffect(() => {
    listDepositos(1);
  }, []);

  const handleAddMoney = () => {
    if (!isAmountInvalid(valor)) {
      showLoader();
      let dateToday = new Date();

      const body: IDeposito = {
        valor: valor,
        tipo: TransacationTypes.DEPOSITO,
        data: FormatDate(dateToday),
        transId: generateUID(),
      };

      createDeposit(body).then((res: any) => {
        hideLoader();

        if (errorResponse(res)) return showToast("error", res?.message);
        listDepositos(1);
      });
    }
  };

  const listDepositos = async (page: number) => {
    const data = await getAccountDetails(
      {
        transType: TransacationTypes.DEPOSITO,
        transPeriod: TransPeriod.RECENT,
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

        <form action={handleAddMoney}>
          <div className={styles.row}>
            <InputText
              onChange={(e) => setValor(Number(e.target.value))}
              id="valor"
              label="valor"
              mask="R$ currency"
              placeHolder="R$ 0.000"
              blocks={currencyBlocks}
              type="text"
              errorMsg={valor && isAmountInvalid(valor) ? "- inválido" : ""}
            />
          </div>

          <div className={styles.end_row}>
            <Button
              disabled={isAmountInvalid(valor)}
              btnClass={BtnClasses.CONFIRM}
              text="Confirmar"
              type="submit"
            />
          </div>
        </form>
      </div>
      {depositList.length ? (
        <div className={styles.transacions_list}>
          <Title size="base" text="Depósitoss recentes" />
          {depositList.map((dp: IDeposito, index) => (
            <div key={index} className={styles.list_items}>
              <Transaction
                refresh={() => listDepositos(pagination.currentPage)}
                dataT={dp}
                key={index}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.no_data}>
          <Title text="Seu extrato está vazio." size="md" />
          <p>Faça algum depósito para visualizar aqui.</p>
        </div>
      )}
    </>
  );
}
