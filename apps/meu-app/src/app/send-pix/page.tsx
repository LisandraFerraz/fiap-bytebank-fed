"use client";

import { InputText } from "@components/input-text/input-text";
import styles from "./styles.module.scss";
import { useState } from "react";
import { IPix } from "../../utils/interfaces/transaction";
import { Button } from "@components/button/button";
import { UseTransactions } from "../../utils/hooks/useTransactions";

export default function SendPix() {
  const { sendPix } = UseTransactions();

  const [pixBody, setPixBody] = useState<IPix>({
    chavePix: "",
    descricao: "",
    valor: 0,
    data: "",
  });

  const updateBody = (key: string, value: string) => {
    setPixBody({
      ...pixBody,
      [key]: key === "valor" ? Number(value) : value,
    });
  };

  const handleSendPix = () => {
    sendPix("98765432100", pixBody);
  };

  return (
    <div className={styles.transaction_layout}>
      <h2>Enviar PIX</h2>

      <div className={styles.pix_form}>
        <div className={styles.row}>
          <InputText
            value={pixBody.valor}
            onChange={(e) => updateBody("valor", e.target.value)}
            id="valor"
            label="Valor"
            placeHolder="Valor"
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
          <Button text="Confirmar" click={handleSendPix} />
        </div>
      </div>
    </div>
  );
}
