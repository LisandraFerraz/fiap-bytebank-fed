import { ModalLayout } from "@components/modal-layout/modal-layout";
import { transacao } from "../../utils/types";
import { FormatTypeName } from "../../utils/functions/format-type-names";
import { TransacationTypes } from "../../utils/interfaces/transaction";
import { DepositForm } from "./transaction-forms/deposito-form";
import React, { ReactNode } from "react";
import { EmprestimoForm } from "./transaction-forms/emprestimo-form";
import { TedForm } from "./transaction-forms/ted-form";
import { PixForm } from "./transaction-forms/pix-form";

export const TransactionDetailsModal = ({
  data,
  onClose,
}: {
  data: transacao;
  onClose: () => void;
}) => {
  const checkFormType = (type: TransacationTypes) => {
    const getComponent: { [key: string]: ReactNode } = {
      [TransacationTypes.DEPOSITO]: <DepositForm data={data} />,
      [TransacationTypes.EMPRESTIMO]: <EmprestimoForm data={data} />,
      [TransacationTypes.PIX]: <TedForm data={data} />,
      [TransacationTypes.TED]: <PixForm data={data} />,
    };

    return getComponent[type];
  };

  return (
    <ModalLayout
      onClose={onClose}
      modalTitle={`Detalhes do ${FormatTypeName(data.tipo)}`}
    >
      <>{checkFormType(data.tipo)}</>
    </ModalLayout>
  );
};
