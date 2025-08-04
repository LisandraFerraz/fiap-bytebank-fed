"use client";
import styles from "./../../styles/page-form.module.scss";
import { Button, InputText } from "@bytebank/ui";
import { useEffect, useState } from "react";
import {
  ITed,
  TransacationTypes,
  TransPeriod,
} from "../../utils/interfaces/transaction";
import { FormatDate } from "../../utils/functions/format-date";
import { useTed } from "../../utils/hooks/useTed";
import { BtnClasses } from "../../utils/types";
import { currencyBlocks } from "@bytebank/utils";
import { isTedFormInvalid } from "../../utils/functions/form-validate/ted-form";
import { isAmountInvalid } from "../../utils/functions/form-validate/valor-validate";
import { Title } from "@components/title-text/title-text";
import { useLoader } from "../../utils/hooks/context-hooks/useLoader";
import { useToast } from "../../utils/hooks/context-hooks/useToast";
import { UseAccount } from "../../utils/hooks/useAccount";
import { Pagination } from "../../utils/interfaces/pagination";
import { Transaction } from "@components/transaction/transaction";
import { errorResponse } from "../../utils/functions/api-res-treatment";
import { v4 as generateUID } from "uuid";

export default function SendTED() {
  const { sendTed } = useTed();
  const { getAccountDetails } = UseAccount();

  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();

  const [tedBody, setTedBody] = useState<ITed>({
    descricao: "",
    data: "",
    valor: 0,
    numConta: 0,
    digito: 0,
    agencia: "",
    cpfDestinatario: "",
    tipo: TransacationTypes.TED,
  });
  const [tedList, setTedList] = useState<ITed[]>([]);
  const [pagination, setPagination] = useState<Pagination>(new Pagination());

  useEffect(() => {
    listTed(1);
  }, []);

  const updateBody = (key: string, value: string | number) => {
    let dateToday = new Date();

    setTedBody({
      ...tedBody,
      [key]:
        key === "valor" || key === "numConta" || key === "digito"
          ? Number(value)
          : value,
      data: FormatDate(dateToday),
      transId: generateUID(),
    });
  };

  const handleSendTED = () => {
    showLoader();
    if (!isTedFormInvalid(tedBody)) {
      sendTed(tedBody).then((res: any) => {
        hideLoader();
        if (errorResponse(res)) return showToast("error", res?.message);

        listTed(1);
      });
    }
  };

  const listTed = async (page: number) => {
    showLoader();
    const data = await getAccountDetails(
      {
        transType: TransacationTypes.TED,
        transPeriod: TransPeriod.RECENT,
      },
      { ...pagination, currentPage: page }
    );
    // if (errorResponse(data)) return showToast("error", data?.message);

    const { transacoes } = data;
    setTedList(transacoes.transactions);
    hideLoader();
  };

  return (
    <>
      <div className={styles.transaction_form}>
        <Title text="Tranferência Bancária" size="lg"></Title>
        <form action={handleSendTED}>
          <div className={styles.row}>
            <InputText
              onChange={(e) => updateBody("valor", e.target.value)}
              id="valor"
              label="Valor"
              placeHolder="R$ 0.000"
              type="text"
              mask="R$ currency"
              blocks={currencyBlocks}
              errorMsg={
                tedBody.valor && isAmountInvalid(tedBody.valor)
                  ? "- inválido"
                  : ""
              }
            />
            <InputText
              id="cpfDestinatario"
              onChange={(e) => updateBody("cpfDestinatario", e.target.value)}
              label="CPF Destinatário"
              placeHolder="000.000.000-00"
              mask="000.000.000-00"
              errorMsg={
                tedBody.cpfDestinatario &&
                String(tedBody.cpfDestinatario).length < 11
                  ? "- inválido"
                  : ""
              }
            />
          </div>

          <div className={styles.row}>
            <InputText
              id="numConta"
              onChange={(e) => updateBody("numConta", e.target.value)}
              label="Conta"
              placeHolder="000000"
              mask="000000"
              type="text"
              errorMsg={
                tedBody.numConta && String(tedBody.numConta).length < 6
                  ? "- insira 6 dígitos"
                  : ""
              }
            />
            <InputText
              id="agencia"
              onChange={(e) => updateBody("agencia", e.target.value)}
              label="Agência"
              placeHolder="000"
              mask="000"
              type="text"
              errorMsg={
                tedBody.agencia && tedBody.agencia.length < 3
                  ? "- insira 3 dígitos"
                  : ""
              }
            />
            <InputText
              id="digito"
              onChange={(e) => updateBody("digito", e.target.value)}
              label="Digito"
              type="text"
              placeHolder="0"
              mask="0"
            />
          </div>

          <div className={styles.row}>
            <InputText
              onChange={(e) => updateBody("descricao", e.target.value)}
              id="descricao"
              label="descrição (opcional)"
              placeHolder="Descrição..."
              errorMsg={
                tedBody.descricao && String(tedBody.descricao).length < 3
                  ? "- insira mais de 3 dígitos"
                  : ""
              }
            />
          </div>

          <div className={styles.end_row}>
            <Button
              disabled={isTedFormInvalid(tedBody)}
              btnClass={BtnClasses.CONFIRM}
              text="Confirmar"
              type="submit"
            />
          </div>
        </form>
      </div>

      {tedList.length && (
        <div className={styles.transacions_list}>
          <Title size="base" text="Transações TED recentes" />
          {tedList.map((dp: ITed, index) => (
            <div key={index} className={styles.list_items}>
              <Transaction
                refresh={() => listTed(pagination.currentPage)}
                dataT={dp}
                key={index}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
