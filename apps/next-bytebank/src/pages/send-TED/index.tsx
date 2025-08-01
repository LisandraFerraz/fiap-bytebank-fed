"use client";
import styles from "./../../styles/page-form.module.scss";
import { Button, InputText } from "@bytebank/ui";
import { useState } from "react";
import { ITed, TransacationTypes } from "../../utils/interfaces/transaction";
import { FormatDate } from "../../utils/functions/format-date";
import { useTed } from "../../utils/hooks/useTed";
import { BtnClasses } from "../../utils/types";

export default function SendTED() {
  const { sendTed } = useTed();

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

      [key]:
        key === "valor" || key === "numConta" || key === "digito"
          ? Number(value)
          : value,
      data: FormatDate(dateToday),
    });
  };

  const handleSendTED = () => {
    sendTed(tedBody);
  };

  return (
    <div className={styles.transaction_form}>
      <h2>Tranferência Bancária</h2>
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
  );
}
