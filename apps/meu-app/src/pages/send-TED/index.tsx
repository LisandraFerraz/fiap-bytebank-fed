"use client";

import { v4 as generateUUID } from "uuid";
import styles from "./styles.module.scss";
import { InputText } from "@components/input-text/input-text";
import { useState } from "react";
import { ITed, TransacationTypes } from "../../utils/interfaces/transaction";
import { UseTransactions } from "../../utils/hooks/useTransactions";
import { BtnClasses, Button } from "@components/button/button";
import { FormatDate } from "../../utils/functions/format-date";

export default function SendTED() {
  const { sendBankDeposit } = UseTransactions();

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

  const updateBody = (key: string, value: string | number) => {
    let dateToday = new Date();

    setTedBody({
      ...tedBody,
      id: generateUUID(),

      [key]:
        key === "valor" || key === "numConta" || key === "digito"
          ? Number(value)
          : value,
      data: FormatDate(dateToday),
    });
  };

  const handleSendTED = () => {
    sendBankDeposit(tedBody);
  };

  return (
    <div className={styles.transaction_layout}>
      <h2>Tranferência Bancária</h2>

      <div className={styles.transaction_form}>
        <div className={styles.row}>
          <InputText
            value={tedBody.valor}
            onChange={(e) => updateBody("valor", e.target.value)}
            id="valor"
            label="Valor"
            placeHolder="Valor"
            type="number"
          />
          <InputText
            value={tedBody.cpfDestinatario}
            id="cpfDestinatario"
            onChange={(e) => updateBody("cpfDestinatario", e.target.value)}
            label="CPF Destinatário"
            placeHolder="CPF Destinatário"
          />
        </div>

        <div className={styles.row}>
          <InputText
            value={tedBody.numConta}
            id="numConta"
            onChange={(e) => updateBody("numConta", e.target.value)}
            label="Conta"
            placeHolder="Número da conta"
          />
          <InputText
            value={tedBody.agencia}
            id="agencia"
            onChange={(e) => updateBody("agencia", e.target.value)}
            label="Agência"
            placeHolder="Agência"
          />
          <InputText
            value={tedBody.digito}
            id="digito"
            onChange={(e) => updateBody("digito", e.target.value)}
            label="Digito"
            placeHolder="Digito da agência"
          />
        </div>

        <div className={styles.row}>
          <InputText
            value={tedBody.descricao}
            onChange={(e) => updateBody("descricao", e.target.value)}
            id="descricao"
            label="Mensagem"
            placeHolder="Mensagem"
          />
        </div>

        <div className={styles.end_row}>
          <Button
            btnClass={BtnClasses.CONFIRM}
            text="Confirmar"
            click={handleSendTED}
          />
        </div>
      </div>
    </div>
  );
}
