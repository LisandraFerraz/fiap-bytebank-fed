import styles from "./transaction-details-modal.module.scss";
import { ModalLayout } from "@components/modal-layout/modal-layout";
import { transacao } from "../../utils/types";
import { FormatTypeName } from "../../utils/functions/format-type-names";
import { TransacationTypes } from "../../utils/interfaces/transaction";
import { DepositForm } from "./transaction-forms/deposito-form";
import React, { ReactNode, useState } from "react";
import { EmprestimoForm } from "./transaction-forms/emprestimo-form";
import { TedForm } from "./transaction-forms/ted-form";
import { PixForm } from "./transaction-forms/pix-form";
import { toBase64 } from "./utils/base64-convert";
import { useToast } from "../../utils/hooks/context-hooks/useToast";

export const TransactionDetailsModal = ({
  data,
  onClose,
}: {
  data: transacao;
  onClose: () => void;
}) => {
  const { showToast } = useToast();

  const [modalData, setModalData] = useState<any>(data);

  const checkFormType = (type: TransacationTypes) => {
    const getComponent: { [key: string]: ReactNode } = {
      [TransacationTypes.DEPOSITO]: (
        <DepositForm closeModal={onClose} data={modalData} />
      ),
      [TransacationTypes.EMPRESTIMO]: (
        <EmprestimoForm closeModal={onClose} data={modalData} />
      ),
      [TransacationTypes.TED]: (
        <TedForm closeModal={onClose} data={modalData} />
      ),
      [TransacationTypes.PIX]: (
        <PixForm closeModal={onClose} data={modalData} />
      ),
    };

    return getComponent[type];
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let file = e.target.files;
    if (file?.length) {
      if (file[0].size > 2097152) {
        showToast("error", "Arquivo não pode ser maior que 2MB.");
      }
      const base64 = await toBase64(file[0] as File);
      setModalData({
        ...data,
        file: base64 as string,
      });
    }
  };

  const clearFile = () => {
    setModalData({
      ...data,
      file: null,
    });
  };

  return (
    <ModalLayout
      onClose={onClose}
      modalTitle={`Detalhes do ${FormatTypeName(modalData?.tipo)}`}
    >
      <div className={styles.upload_file_container}>
        <input
          accept="image/*,.pdf"
          type="file"
          onChange={(e) => handleUploadFile(e)}
        />
        {modalData.file && (
          <div className={styles.file_actions}>
            <button onClick={clearFile}>Remover arquivo</button>
          </div>
        )}
      </div>
      <>{checkFormType(modalData?.tipo)}</>
    </ModalLayout>
  );
};
