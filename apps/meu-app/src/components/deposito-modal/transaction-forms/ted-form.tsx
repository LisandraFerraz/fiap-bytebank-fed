import styles from "./form.module.scss";
import { useTed } from "../../../utils/hooks/useTed";
import { useState } from "react";
import { InputText } from "@components/input-text/input-text";
import { ITed } from "../../../utils/interfaces/transaction";
import { BtnClasses, Button } from "@components/button/button";
import { formatCpf } from "../../../utils/functions/mask-values";
import { useMask } from "@react-input/mask";

export const TedForm = ({ data }: { data: any }) => {
  const { deleteTed, updateTed } = useTed();

  const [updatedTed, setUpdatedTed] = useState<any>({
    ...data,
    valor: data.valor,
    cpfDestinatario: formatCpf(data.cpfDestinatario),
    numConta: data.numConta,
    agencia: data.agencia,
    digito: data.digito,
    descricao: data.descricao,
  });

  const handleChangeValues = (key: keyof ITed, value: string | number) => {
    setUpdatedTed({
      ...updatedTed,
      [key]: value,
    });
  };

  const handleDeleteTed = () => {
    deleteTed(data.id);
  };

  const handleUpdateTed = () => {
    if (!isNaN(updatedTed.agencia) || updatedTed < 1) {
      updateTed({
        ...updatedTed,
        cpfDestinatario: updatedTed.cpfDestinatario.replace(/[.-]/g, ""),
      });
    } else {
      console.error("Agência tem que ser um tipo númerico.");
    }
  };

  const cpfMaks = useMask({
    mask: "000.000.000-00",
    replacement: { 0: /\d/ },
  });

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
              label="Valor do depósito"
              placeHolder="Valor do depósito"
              value={updatedTed.valor}
              onChange={(e) =>
                handleChangeValues("valor", Number(e.target.value))
              }
              type="number"
            />
          </div>
          <div>
            <InputText
              id="cpfDestinatario"
              label="CPF do destinatário"
              placeHolder="CPF do destinatário"
              value={updatedTed.cpfDestinatario}
              onChange={(e) =>
                handleChangeValues("cpfDestinatario", e.target.value)
              }
              type="text"
              ref={cpfMaks}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <InputText
              id="numconta"
              label="Conta"
              placeHolder="Nº da conta"
              value={updatedTed.numConta}
              onChange={(e) => handleChangeValues("numConta", e.target.value)}
              type="number"
            />
          </div>
          <div>
            <InputText
              id="agencia"
              label="Agência"
              placeHolder="Agência"
              value={updatedTed.agencia}
              onChange={(e) => handleChangeValues("agencia", e.target.value)}
              type="text"
            />
          </div>
          <div>
            <InputText
              id="digito"
              label="Dígito"
              placeHolder="Dígito"
              value={updatedTed.digito}
              onChange={(e) => handleChangeValues("digito", e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <InputText
              id="descricao"
              label="Descrição"
              placeHolder="Descrição"
              value={updatedTed.descricao}
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
