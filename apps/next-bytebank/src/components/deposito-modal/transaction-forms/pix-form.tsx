import styles from "./form.module.scss";
import { Button, InputText } from "@bytebank/ui";
import { useState } from "react";
import { IPix } from "../../../utils/interfaces/transaction";
import { UsePix } from "../../../utils/hooks/usePix";
import { BtnClasses } from "../../../utils/types";
import { errorResponse } from "../../../utils/functions/api-res-treatment";
import { useToast } from "../../../utils/hooks/context-hooks/useToast";
import { currencyBlocks } from "@bytebank/utils";
import { isAmountInvalid } from "../../../utils/functions/form-validate/valor-validate";
import { isPixFormInvalid } from "../../../utils/functions/form-validate/pix-form";
import { useLoader } from "../../../utils/hooks/context-hooks/useLoader";

export const PixForm = ({
  data,
  closeModal,
}: {
  data: any;
  closeModal: () => void;
}) => {
  const { deletePix, updatePix } = UsePix();
  const { showToast } = useToast();
  const { showLoader, hideLoader } = useLoader();

  const [updatedPix, setUpdatedPix] = useState<any>({
    ...data,
    descricao: data?.descricao,
    chavePix: data?.chavePix,
    destinatario: data?.destinatario,
    valor: data?.valor,
    id: data?.id,
  });

  const handleChangeValues = (key: keyof IPix, value: string | number) => {
    setUpdatedPix({
      ...updatedPix,
      [key]: value,
    });
  };
  const handleDeletePIX = () => {
    showLoader();
    deletePix(data?.transId).then((res: any) => {
      hideLoader();
      if (errorResponse(res)) return showToast("error", res?.message);
      closeModal();
    });
  };

  const handleUpdatePIX = () => {
    showLoader();
    updatePix(updatedPix).then((res: any) => {
      hideLoader();
      if (errorResponse(res)) return showToast("error", res?.message);
      closeModal();
    });
  };

  return (
    <>
      <div className={styles.transaction_form}>
        <div className={styles.payment_info}>
          <p className={styles.pending_payment}>
            Valor original: <b>R$ {data?.valor}</b>
          </p>
        </div>
        <div className={styles.row}>
          <div>
            <InputText
              id="valor"
              label="Valor do PIX"
              onChange={(e) =>
                handleChangeValues("valor", Number(e.target.value))
              }
              mask="R$ currency"
              blocks={currencyBlocks}
              placeHolder="R$ 0.000"
              type="text"
              errorMsg={
                updatedPix.valor && isAmountInvalid(updatedPix.valor)
                  ? "- inválido"
                  : ""
              }
            />
            <p className={styles.original_legenda}>
              Valor original: R$ {data?.valor}
            </p>
          </div>
        </div>
        <div className={styles.row}>
          <InputText
            id="chavePix"
            label="Chave pix"
            placeHolder="Chave pix"
            onChange={(e) => handleChangeValues("chavePix", e.target.value)}
            type="text"
            errorMsg={
              updatedPix.chavePix && String(updatedPix.chavePix).length < 6
                ? "- insira mais de 6 dígitos"
                : ""
            }
          />
          <InputText
            id="destinatario"
            label="Destinatário"
            placeHolder="Destinatário"
            onChange={(e) => handleChangeValues("destinatario", e.target.value)}
            type="text"
            errorMsg={
              updatedPix.destinatario &&
              String(updatedPix.destinatario).length < 3
                ? "- insira mais de 3 dígitos"
                : ""
            }
          />
        </div>
        <div className={styles.row}>
          <div>
            <InputText
              id="descricao"
              label="Descrição"
              placeHolder="Mensagem"
              onChange={(e) => handleChangeValues("descricao", e.target.value)}
              type="text"
              errorMsg={
                updatedPix.descricao && String(updatedPix.descricao).length < 3
                  ? "- insira mais de 3 dígitos"
                  : ""
              }
            />
          </div>
        </div>
        <div className={styles.end_row}>
          <Button
            btnClass={BtnClasses.DELETE}
            text="Excluir"
            click={handleDeletePIX}
          />
          <Button
            btnClass={BtnClasses.CONFIRM}
            text="Salvar Alterações"
            type="submit"
            click={handleUpdatePIX}
            disabled={isPixFormInvalid(updatedPix)}
          />
        </div>
      </div>
    </>
  );
};
