import { v4 as generateUUID } from "uuid";
import styles from "./../../styles/page-form.module.scss";
import { InputText } from "@components/input-text/input-text";
import { useState } from "react";
import { IPix, TransacationTypes } from "../../utils/interfaces/transaction";
import { BtnClasses, Button } from "@components/button/button";
import { UsePix } from "../../utils/hooks/usePix";
import { FormatDate } from "../../utils/functions/format-date";
import { GetServerSideProps } from "next";
import { endpoints } from "../../environment/endpoints";
import { env } from "../api/_environment/environment";
import { IResumoConta } from "../../utils/interfaces/user";

interface IAccountProps {
  data: IResumoConta;
}

export default function SendPix({ data }: IAccountProps) {
  const { sendPix } = UsePix();

  const [pixBody, setPixBody] = useState<IPix>({
    chavePix: "",
    descricao: "",
    valor: 100,
    data: "",
    tipo: TransacationTypes.PIX,
    destinatario: "",
  });

  const updateBody = (key: string, value: string) => {
    const dateToday = new Date();

    setPixBody({
      id: generateUUID(),
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
      <h5>Saldo disponível: R$ {data?.saldo}</h5>

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

export const getStaticProps: GetServerSideProps<IAccountProps> = async () => {
  try {
    const response = await fetch(
      `${env.bffUrl}${endpoints.listaAccount}?cpf=${"12345678901"}`,
      { method: "GET" }
    );
    const dataRes = await response.json();
    const data = dataRes.data;

    return {
      props: {
        data: data?.accDetails,
      },
    };
  } catch (error) {
    return {
      props: {
        data: {},
      },
    };
  }
};
