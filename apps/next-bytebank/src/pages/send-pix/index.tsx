import styles from "./../../styles/page-form.module.scss";
import { Button, InputText } from "@bytebank/ui";
import { useState } from "react";
import { IPix, TransacationTypes } from "../../utils/interfaces/transaction";
import { UsePix } from "../../utils/hooks/usePix";
import { FormatDate } from "../../utils/functions/format-date";
import { BtnClasses } from "../../utils/types";
import { hasEmptyValues } from "@bytebank/utils";
import { UserDataStore } from "../../stores/user-data-store";

export default function SendPix() {
  const { sendPix } = UsePix();
  const { account } = UserDataStore((state) => state.data);

  const [pixBody, setPixBody] = useState<IPix>({
    chavePix: "",
    descricao: "",
    valor: null,
    data: "",
    tipo: TransacationTypes.PIX,
    destinatario: "",
  });

  const updateBody = (key: string, value: string) => {
    const dateToday = new Date();

    setPixBody({
      ...pixBody,
      [key]: key === "valor" ? Number(value) : value,
      data: FormatDate(dateToday),
    });
  };

  const handleSendPix = () => {
    sendPix(pixBody);
  };

  return (
    <div className={styles.transaction_layout}>
      <h2>Registrar PIX</h2>

      <h5>Saldo disponível: R$ {account?.saldo}</h5>

      <div className={styles.transaction_form}>
        <div className={styles.row}>
          <InputText
            value={pixBody.valor}
            onChange={(e) => updateBody("valor", e.target.value)}
            id="valor"
            label="Valor"
            placeHolder="R$ 0"
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
            value={pixBody.destinatario}
            id="destinatario"
            onChange={(e) => updateBody("destinatario", e.target.value)}
            label="Destinatário"
            placeHolder="Destinatário"
          />
        </div>
        <div className={styles.row}>
          <InputText
            value={pixBody.descricao}
            id="mensagem"
            onChange={(e) => updateBody("descricao", e.target.value)}
            label="Mensagem (opcional)"
            placeHolder="Mensagem"
          />
        </div>

        <div className={styles.end_row}>
          <Button
            disabled={hasEmptyValues(pixBody)}
            text="Confirmar"
            btnClass={BtnClasses.CONFIRM}
            click={handleSendPix}
          />
        </div>
      </div>
    </div>
  );
}
