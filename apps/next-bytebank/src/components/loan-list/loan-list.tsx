import styles from "./loan-list.module.scss";
import { useState } from "react";
import { IEmprestimo } from "../../utils/interfaces/transaction";
import { LoanModal } from "@components/loan-modal/loan-modal";
import { FormatDateSlash } from "../../utils/functions/format-date";
import { BtnClasses } from "../../utils/types";
import { Button } from "@bytebank/ui";

interface ILoan {
  data: IEmprestimo[];
  updateDate: () => void;
}

export const LoanList = ({ data, updateDate }: ILoan) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IEmprestimo>();

  const handleModal = (data: IEmprestimo) => {
    setIsOpen(true);
    setModalData(data);
  };

  const handleCloseModal = () => {
    updateDate();
    setIsOpen(false);
  };

  return (
    <>
      {data.length ? (
        <div className={styles.pending_list}>
          {data?.map((item: IEmprestimo, index) => (
            <div key={index} className={styles.list_item}>
              <div>
                {item.aberto ? <h4>A pagar</h4> : <h4>Pago</h4>}
                <p>Aberto em {FormatDateSlash(item.data)}</p>
                <p>
                  R${" "}
                  {item.aberto ? (
                    <span>{item.valorDevido}</span>
                  ) : (
                    <span>{item.valor}</span>
                  )}{" "}
                </p>
              </div>
              {item.aberto && (
                <Button
                  text="Registrar pagamento"
                  click={() => handleModal(item)}
                  btnClass={BtnClasses.CONFIRM}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <h3 className={styles.empty_msg}>Sem itens</h3>
      )}
      {isOpen && modalData && (
        <LoanModal onClose={handleCloseModal} data={modalData} />
      )}
    </>
  );
};
