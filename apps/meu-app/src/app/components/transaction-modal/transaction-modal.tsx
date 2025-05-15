import styles from "./transaction-modal.module.scss";
import { ModalLayout } from "components/modal-layout/modal-layout";
import { TransacationTypes } from "../../../utils/mock/interfaces/transaction";
import { Button } from "components/button/button";

export const TransactionModal = ({
  transactionType,
}: {
  transactionType: TransacationTypes;
}) => {
  const isDeposit = transactionType === TransacationTypes.DEPOSITO;

  return (
    <ModalLayout modalTitle={isDeposit ? "Novo depósito" : "Enviar dinheiro"}>
      {/* Salvar contato após a transferência ter sido feita */}
      <div className={styles.modal}>
        <form>
          <div>
            <label>Valor</label>
            <input type="text" />
          </div>
          <div>
            <label>Nome do recipiente</label>
            <input type="text" />
          </div>
          <div>
            <label>Número da conta</label>
            <input type="text" />
          </div>
          <div>
            <label>Agência</label>
            <input type="text" />
          </div>

          <Button text="Enviar" />
        </form>
      </div>
    </ModalLayout>
  );
};
