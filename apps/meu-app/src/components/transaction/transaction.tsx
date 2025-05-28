import styles from "./transaction.module.scss";

import { Icon } from "@components/icon/icon";

import { BtnClasses, Button } from "@components/button/button";
import { TransacationTypes } from "../../utils/interfaces/transaction";
import { useState } from "react";
import { TransactionDetailsModal } from "@components/deposito-modal/transaction-details-modal";
import { transacao } from "../../utils/types";
import { FormatTypeName } from "../../utils/functions/format-type-names";

export const Transaction = ({ dataT }: { dataT: transacao }) => {
  const isExpanse = dataT?.tipo !== TransacationTypes.DEPOSITO;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    console.log(dataT);
    if (dataT) {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.transaction}>
        <div className={styles.transaction_content}>
          <span
            className={`${styles.icon} ${
              isExpanse ? styles.deposit : styles.expanse
            }`}
          >
            <Icon iconKey={isExpanse ? "expanse" : "deposit"} />
          </span>
          <div className={styles.transaction_text}>
            <p className={styles.transaction_date}>{dataT.data}</p>
            <p>{FormatTypeName(dataT.tipo)}</p>
            <p className={styles.transaction_value}>R$ {dataT.valor}</p>
          </div>
        </div>
        <Button
          click={handleOpenModal}
          btnClass={BtnClasses.DEFAULT}
          text="Visualizar"
        />
      </div>
      {isOpen && (
        <TransactionDetailsModal data={dataT} onClose={handleCloseModal} />
      )}
    </>
  );
};
