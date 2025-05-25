"use client";

import { v4 as generateUUID } from "uuid";
import styles from "./styles.module.scss";
import { InputText } from "@components/input-text/input-text";
import { useState } from "react";
import { IPix, TransacationTypes } from "../../utils/interfaces/transaction";
import { BtnClasses, Button } from "@components/button/button";
import { UseTransactions } from "../../utils/hooks/useTransactions";

export default function SendPix() {
  const { sendPix } = UseTransactions();

  const [pixBody, setPixBody] = useState<IPix>({
    chavePix: "",
    descricao: "",
    valor: 100,
    data: "",
    tipo: TransacationTypes.TRANSFERENCIA,
  });

  const updateBody = (key: string, value: string) => {
    const dateToday = new Date();

    setPixBody({
      id: generateUUID(),
      ...pixBody,
      [key]: key === "valor" ? Number(value) : value,
      data: String(dateToday),
    });
  };

  const handleSendPix = () => {
    sendPix("98765432100", pixBody);
  };

  return (
    <div className={styles.transaction_layout}>
      <h2>Enviar PIX</h2>

      <div className={styles.transaction_form}>
        <div className={styles.row}>
          <InputText
            value={pixBody.valor}
            onChange={(e) => updateBody("valor", e.target.value)}
            id="valor"
            label="Valor"
            placeHolder="Valor"
            type="number"
          />
          <InputText
            value={pixBody.chavePix}
            id="chavePix"
            onChange={(e) => updateBody("chavePix", e.target.value)}
            label="Chave PIX"
            placeHolder="Chave PIX"
          />
        </div>

        <div className={styles.row}>
          <InputText
            value={pixBody.descricao}
            id="mensagem"
            onChange={(e) => updateBody("descricao", e.target.value)}
            label="Mensagem"
            placeHolder="Mensagem"
          />
        </div>

        <div className={styles.end_row}>
          <Button
            text="Confirmar"
            btnClass={BtnClasses.CONFIRM}
            click={handleSendPix}
          />
        </div>
      </div>
    </div>
  );
}
