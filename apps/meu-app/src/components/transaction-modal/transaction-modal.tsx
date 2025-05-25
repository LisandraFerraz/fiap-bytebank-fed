import styles from "./transaction-modal.module.scss";
import { ModalLayout } from "@components/modal-layout/modal-layout";
import { Button } from "@components/button/button";
import { TransacationTypes } from "../../utils/interfaces/transaction";

export const TransactionModal = ({
  transactionType,
}: {
  transactionType: TransacationTypes;
}) => {
  const isDeposit = transactionType === TransacationTypes.DEPOSITO;

  return (
    <ModalLayout modalTitle={isDeposit ? "Novo depósito" : "Enviar dinheiro"}>
      {/* Salvar contato após a transferência ter sido feita */}
      <div className={styles.modal}></div>
    </ModalLayout>
  );
};
