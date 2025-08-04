import styles from "./form.module.scss";
import { useTed } from "../../../utils/hooks/useTed";
import { useEffect, useState } from "react";
import { Button, InputText } from "@bytebank/ui";
import { ITed } from "../../../utils/interfaces/transaction";
import { BtnClasses } from "../../../utils/types";
import { errorResponse } from "../../../utils/functions/api-res-treatment";
import { useToast } from "../../../utils/hooks/context-hooks/useToast";
import { currencyBlocks } from "@bytebank/utils";
import { isAmountInvalid } from "../../../utils/functions/form-validate/valor-validate";
import { isTedFormInvalid } from "../../../utils/functions/form-validate/ted-form";
import { useLoader } from "../../../utils/hooks/context-hooks/useLoader";

export const TedForm = ({
  data,
  closeModal,
  newFile,
}: {
  data: any;
  closeModal: () => void;
  newFile: boolean;
}) => {
  const { deleteTed, updateTed } = useTed();
  const { showToast } = useToast();
  const { showLoader, hideLoader } = useLoader();

  const [updatedTed, setUpdatedTed] = useState<any>({
    ...data,
    valor: data?.valor,
    cpfDestinatario: data?.cpfDestinatario,
    numConta: data?.numConta,
    agencia: data?.agencia,
    digito: data?.digito,
    descricao: data?.descricao,
  });

  const handleChangeValues = (key: keyof ITed, value: string | number) => {
    setUpdatedTed({
      ...updatedTed,
      [key]: value,
    });
  };

  const handleDeleteTed = () => {
    showLoader();
    deleteTed(data?.transId).then((res: any) => {
      hideLoader();
      if (errorResponse(res)) return showToast("error", res?.message);
      closeModal();
    });
  };

  const handleUpdateTed = () => {
    if (!isTedFormInvalid(updateTed)) {
      showLoader();
      updateTed({
        ...updatedTed,
      }).then((res: any) => {
        hideLoader();
        if (errorResponse(res)) return showToast("error", res?.message);
        closeModal();
      });
    }
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
          <InputText
            id="valor"
            label="Valor do depósito"
            onChange={(e) =>
              handleChangeValues("valor", Number(e.target.value))
            }
            placeHolder="R$ 0.000"
            type="text"
            mask="R$ currency"
            blocks={currencyBlocks}
            errorMsg={
              updatedTed.valor && isAmountInvalid(updatedTed.valor)
                ? "- inválido"
                : ""
            }
          />
          <InputText
            id="cpfDestinatario"
            onChange={(e) =>
              handleChangeValues("cpfDestinatario", e.target.value)
            }
            type="text"
            label="CPF Destinatário"
            placeHolder="000.000.000-00"
            mask="000.000.000-00"
            errorMsg={
              updatedTed.cpfDestinatario &&
              String(updatedTed.cpfDestinatario).length < 11
                ? "- inválido"
                : ""
            }
          />
        </div>
        <div className={styles.row}>
          <InputText
            id="numconta"
            label="Conta"
            placeHolder="000000"
            onChange={(e) => handleChangeValues("numConta", e.target.value)}
            mask="000000"
            type="text"
            errorMsg={
              updatedTed.numConta && String(updatedTed.numConta).length < 6
                ? "- insira 6 dígitos"
                : ""
            }
          />
          <InputText
            id="agencia"
            label="Agência"
            placeHolder="000"
            onChange={(e) => handleChangeValues("agencia", e.target.value)}
            type="text"
            mask="000"
            errorMsg={
              updatedTed.agencia && updatedTed.agencia.length < 3
                ? "- insira 3 dígitos"
                : ""
            }
          />
          <InputText
            id="digito"
            label="Dígito"
            placeHolder="0"
            onChange={(e) => handleChangeValues("digito", e.target.value)}
            type="number"
            mask="0"
          />
        </div>
        <div className={styles.row}>
          <InputText
            id="descricao"
            label="descrição (opcional)"
            placeHolder="Descrição..."
            onChange={(e) => handleChangeValues("descricao", e.target.value)}
            type="text"
            errorMsg={
              updatedTed.digito && String(updatedTed.digito).length < 3
                ? "- insira mais de 3 dígitos"
                : ""
            }
          />
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
            disabled={isTedFormInvalid(updatedTed) && !newFile}
            click={handleUpdateTed}
          />
        </div>
      </div>
    </>
  );
};
