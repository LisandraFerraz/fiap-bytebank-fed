import { BtnClasses, Button } from "@components/button/button";
import styles from "./form.module.scss";
import { InputText } from "@components/input-text/input-text";
import { useState } from "react";
import { IPix } from "../../../utils/interfaces/transaction";
import { UsePix } from "../../../utils/hooks/usePix";

export const PixForm = ({ data }: { data: any }) => {
  const { deletePix, updatePix } = UsePix();

  const [updatedPix, setUpdatedPix] = useState<any>({
    ...data,
    descricao: data.descricao,
    chavePix: data.chavePix,
    destinatario: data.destinatario,
    valor: data.valor,
    id: data.id,
  });

  const handleChangeValues = (key: keyof IPix, value: string | number) => {
    setUpdatedPix({
      ...updatedPix,
      [key]: value,
    });
  };
  const handleDeleteTed = () => {
    deletePix(data.id);
  };

  const handleUpdateTed = () => {
    updatePix(updatedPix);
  };

  return (
    <>
      <div className={styles.transaction_form}>
        <div className={styles.payment_info}>
          <p className={styles.pending_payment}>
            Valor original: <b>R$ {data.valor}</b>
          </p>
        </div>
        <div className={styles.row}>
          <div>
            <InputText
              id="valor"
              label="Valor do PIX"
              placeHolder="Valor do PIX"
              value={updatedPix.valor}
              onChange={(e) =>
                handleChangeValues("valor", Number(e.target.value))
              }
              type="number"
            />
            <p className={styles.original_legenda}>
              Valor original: R$ {data.valor}
            </p>
          </div>
        </div>
        <div className={styles.row}>
          <InputText
            id="chavePix"
            label="Chave pix"
            placeHolder="Chave pix"
            value={updatedPix.chavePix}
            onChange={(e) => handleChangeValues("chavePix", e.target.value)}
            type="text"
          />
          <InputText
            id="destinatario"
            label="Destinatário"
            placeHolder="Destinatário"
            value={updatedPix.destinatario}
            onChange={(e) => handleChangeValues("destinatario", e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.row}>
          <div>
            <InputText
              id="descricao"
              label="Mensagem"
              placeHolder="Mensagem"
              value={updatedPix.descricao}
              onChange={(e) => handleChangeValues("descricao", e.target.value)}
              type="text"
            />
          </div>
        </div>
        <div className={styles.end_row}>
          <Button
            btnClass={BtnClasses.DELETE}
            text="Excluir"
            click={handleDeleteTed}
          />
          <Button
            btnClass={BtnClasses.CONFIRM}
            text="Salvar Alterações"
            click={handleUpdateTed}
          />
        </div>
      </div>
    </>
  );
};
